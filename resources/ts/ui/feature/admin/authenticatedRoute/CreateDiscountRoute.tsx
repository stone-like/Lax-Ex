import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { StaticContext, RouteComponentProps } from "react-router";
import { Discount } from "../../../../core/entity/Discount";
import { discountSearchType } from "../discount/search/discountSearchType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";

type discountProps = {
    discount: Discount;
};

type LocationState = discountProps | discountSearchType;

type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type createDiscountRouteProps = {
    path: string | string[];
    component: componentType;
};

export const CreateDiscountRoute = (props: createDiscountRouteProps) => {
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
                    nameList.includes("createDiscount") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require CreateDiscountPermission."
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
