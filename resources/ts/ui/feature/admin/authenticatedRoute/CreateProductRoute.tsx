import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { Product } from "../../../../core/entity/Product";
import { StaticContext, RouteComponentProps } from "react-router";
import { allSearchByType } from "../product/searchProduct/SearchType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";
type productProps = {
    product: Product;
};
type LocationState = productProps | allSearchByType;
type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type AttachRoleAndPermProps = {
    exact?: boolean;
    path: string | string[];
    component: componentType;
};

export const CreateProductRoute = (props: AttachRoleAndPermProps) => {
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
                    nameList.includes("createProduct") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require CreateProductPermission."
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
