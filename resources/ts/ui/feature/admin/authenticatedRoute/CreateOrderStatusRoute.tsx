import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";
import { RootState } from "../../../store/configureStore";
import { plunkPermissionToNames } from "./PlunkPermissionToNames";
import { StaticContext, RouteComponentProps } from "react-router";
import { OrderStatus } from "../../../../core/entity/OrderStatus";
import { orderStatusSearchType } from "../orderStatus/search/orderStatusSearchType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";

type orderStatusProps = {
    orderStatus: OrderStatus;
};

type LocationState = orderStatusProps | orderStatusSearchType;

type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type createOrderStatusRouteProps = {
    path: string | string[];
    component: componentType;
};

export const CreateOrderStatusRoute = (props: createOrderStatusRouteProps) => {
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
                    nameList.includes("createOrderStatus") ? (
                        <Route {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/admin/error",
                                state: {
                                    error: {
                                        errors: {
                                            auth:
                                                "authenticated Error! require CreateOrderStatusPermission."
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
