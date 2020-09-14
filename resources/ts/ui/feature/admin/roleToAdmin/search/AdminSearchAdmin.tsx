import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Loader } from "semantic-ui-react";

import { StaticContext, Redirect, RouteComponentProps } from "react-router";
import { adminSearchType, searchAdminObjType } from "./adminSearchType";
import { adminEntityListType } from "../../../../../core/repository/admin/AdminType";
import { AdminLaravel } from "../../../../../core/repository/admin/AdminLaravel";
import { AdminInteractor } from "../../../../../core/usecase/AdminInteractor";
import { AdminTable } from "./AdminTable";
import { InputAdmin } from "./InputAdmin";

export const AdminSearchAdmin = (
    props: RouteComponentProps<{}, StaticContext, adminSearchType>
) => {
    const searchObj = props.location.state.searchObj;
    const [adminList, setAdminList] = useState<adminEntityListType>();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const repository = new AdminLaravel();
    const interactor = new AdminInteractor(repository);
    const SearchFromBackend = async (searchObj: searchAdminObjType) => {
        return await interactor.searchByName(searchObj.input);
    };
    const SetAllAdmin = async () => {
        const adminList = await interactor.getAllAdmin();
        setAdminList(adminList);
    };

    const SearchAdmin = async () => {
        if (searchObj === undefined) {
            return;
        }
        if (searchObj.input === "") {
            await SetAllAdmin();

            return;
        }

        const res = await SearchFromBackend(searchObj);
        if (res.isFailure()) {
            //通常発生しないvalidationErrorが起こった時
            return (
                <Redirect
                    to={{
                        pathname: "/admin/error",
                        state: { error: { errors: res.value } }
                    }}
                />
            );
        }
        setAdminList(res.value); //useStateがすぐには反映されない問題
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchAdmin();
    }, [searchObj]);

    useEffect(() => {
        setIsLoaded(true);
    }, [adminList]);
    return (
        <SearchAdminContainer>
            <InputAdmin />
            {isSearchObjLoaded ? (
                <AdminTable adminList={adminList} setAdminList={setAdminList} />
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchAdminContainer>
    );
};
const SearchAdminContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
