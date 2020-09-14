import React, { useState, useEffect } from "react";
import { StaticContext, Redirect, RouteComponentProps } from "react-router";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import {
    permissionSearchType,
    searchPermissionObjType
} from "./permissionSearchType";
import { permissionEntityListType } from "../../../../../core/repository/permission/PermissionType";
import { PermissionLaravel } from "../../../../../core/repository/permission/PermissionLaravel";
import { PermissionInteractor } from "../../../../../core/usecase/PermissionInteractor";
import { AdminPermissionTable } from "./AdminPermissionTable";
import { InputPermission } from "./InputPermission";
export const AdminSearchPermission = (
    props: RouteComponentProps<{}, StaticContext, permissionSearchType>
) => {
    const searchObj = props.location.state.searchObj;
    const [permissionList, setPermissionList] = useState<
        permissionEntityListType
    >();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const repository = new PermissionLaravel();
    const interactor = new PermissionInteractor(repository);
    const SearchFromBackend = async (searchObj: searchPermissionObjType) => {
        return await interactor.searchByName(searchObj.input);
    };
    const SetAllPermission = async () => {
        const permissionList = await interactor.getAllPermission();
        setPermissionList(permissionList);
    };

    const SearchPermission = async () => {
        if (searchObj === undefined) {
            return;
        }
        if (searchObj.input === "") {
            await SetAllPermission();

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
        setPermissionList(res.value); //useStateがすぐには反映されない問題
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchPermission();
    }, [searchObj]);

    useEffect(() => {
        setIsLoaded(true);
    }, [permissionList]);
    return (
        <SearchPermissionContainer>
            <InputPermission />
            {isSearchObjLoaded ? (
                <AdminPermissionTable
                    permissionList={permissionList}
                    setPermissionList={setPermissionList}
                />
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchPermissionContainer>
    );
};
const SearchPermissionContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
