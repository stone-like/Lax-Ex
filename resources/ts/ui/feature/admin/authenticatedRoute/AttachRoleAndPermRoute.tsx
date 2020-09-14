import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { StaticContext, RouteComponentProps } from "react-router";
import { Role } from "../../../../core/entity/Role";
import { roleEntityListType } from "../../../../core/repository/role/RoleType";
import { roleSearchType } from "../role/search/roleSearchType";
import { adminSearchType } from "../roleToAdmin/search/adminSearchType";
import { Admin } from "../../../../core/entity/Admin";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";
type roleProps = {
    role: Role;
};
type adminProps = {
    admin: Admin;
};

type LocationState = roleProps | adminProps | roleSearchType | adminSearchType;
type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type AttachRoleAndPermProps = {
    path: string | string[];
    component: componentType;
};
export const AttachRoleAndPermRoute = (props: AttachRoleAndPermProps) => {
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
                    nameList.includes("attachRoleAndPerm") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require AttachRoleAndPermPermission."
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
