import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { StaticContext, RouteComponentProps } from "react-router";
import { Role } from "../../../../core/entity/Role";
import { roleEntityListType } from "../../../../core/repository/role/RoleType";
import { roleSearchType } from "../role/search/roleSearchType";
import { Permission } from "../../../../core/entity/Permission";
import { permissionEntityListType } from "../../../../core/repository/permission/PermissionType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";
type roleProps = {
    role: Role;
    // roleList: roleEntityListType;
};
type permissionProps = {
    permission: Permission;
    // permissionList: permissionEntityListType;
};

type LocationState = roleProps | roleSearchType | permissionProps;
type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type CreateRoleAndPermProps = {
    path: string | string[];
    component: componentType;
};
export const CreateRoleAndPermRoute = (props: CreateRoleAndPermProps) => {
    const admin = useSelector((state: RootState) => {
        return state.admin.admin;
    });
    const { component, ...rest } = props;

    const nameList = plunkPermissionToNames(admin.permissions);

    return (
        <Route
            {...rest}
            render={() =>
                admin.isLoggedIn ? (
                    nameList.includes("createRoleAndPerm") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require CreateRoleAndPermPermission."
                                        }
                                    }
                                }
                            }}
                        />
                    )
                ) : (
                    <CustomLoader />
                )
            }
        />
    );
};
