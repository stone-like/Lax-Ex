import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { Product } from "../../../../core/entity/Product";
import { StaticContext, RouteComponentProps } from "react-router";
import { allSearchByType } from "../product/searchProduct/SearchType";
import { User } from "../../../../core/entity/User";
import { userSearchType } from "../user/search/userSearchType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";

type userProps = {
    user: User;
};

type LocationState = userProps | userSearchType;

type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type ChangeUserRouteProps = {
    path: string | string[];
    component: componentType;
};

export const ChangeUserRoute = (props: ChangeUserRouteProps) => {
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
                    nameList.includes("changeUser") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require ChangeUserPermission."
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
