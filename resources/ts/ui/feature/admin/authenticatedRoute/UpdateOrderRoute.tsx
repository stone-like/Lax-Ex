import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { StaticContext, RouteComponentProps } from "react-router";
import { Order } from "../../../../core/entity/Order";
import { orderSearchType } from "../order/search/orderSearchType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";

type orderProps = {
    order: Order;
};

type LocationState = orderProps | orderSearchType;

type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type updateOrderRouteProps = {
    path: string | string[];
    component: componentType;
};

export const UpdateOrderRoute = (props: updateOrderRouteProps) => {
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
                    nameList.includes("updateOrder") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require UpdateOrderPermission."
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
