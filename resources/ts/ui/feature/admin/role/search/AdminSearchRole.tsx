import React, { useState, useEffect } from "react";
import { roleSearchType, searchRoleObjType } from "./roleSearchType";
import { StaticContext, Redirect, RouteComponentProps } from "react-router";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import { InputRole } from "./InputRole";
import { AdminRoleTable } from "./AdminRoleTable";

export const AdminSearchRole = (
    props: RouteComponentProps<{}, StaticContext, roleSearchType>
) => {
    const searchObj = props.location.state.searchObj;
    const [roleList, setRoleList] = useState<roleEntityListType>();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const repository = new RoleLaravel();
    const interactor = new RoleInteractor(repository);
    const SearchFromBackend = async (searchObj: searchRoleObjType) => {
        return await interactor.searchByName(searchObj.input);
    };
    const SetAllRole = async () => {
        const roleList = await interactor.getAllRole();
        setRoleList(roleList);
    };

    const SearchRole = async () => {
        if (searchObj === undefined) {
            return;
        }
        if (searchObj.input === "") {
            await SetAllRole();

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
        setRoleList(res.value); //useStateがすぐには反映されない問題
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchRole();
    }, [searchObj]);

    useEffect(() => {
        setIsLoaded(true);
    }, [roleList]);
    return (
        <SearchRoleContainer>
            <InputRole />
            {isSearchObjLoaded ? (
                <AdminRoleTable roleList={roleList} setRoleList={setRoleList} />
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchRoleContainer>
    );
};
const SearchRoleContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
