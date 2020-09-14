import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { StaticContext, RouteComponentProps } from "react-router";
import { Category } from "../../../../core/entity/Category";
import { categorySearchType } from "../category/search/categorySearchType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";

type categoryProps = {
    category: Category;
};

type LocationState = categoryProps | categorySearchType;

type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type createCategoryRouteProps = {
    path: string | string[];
    component: componentType;
};

export const CreateCategoryRoute = (props: createCategoryRouteProps) => {
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
                    nameList.includes("createCategory") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require CreateCategoryPermission."
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
