import React, { useState, useEffect, Component } from "react";
import { AuthCheckLaravel } from "../../../../core/repository/authCheck/AuthCheckLaravel";
import { AuthCheckInteractor } from "../../../../core/usecase/AuthCheckInteractor";
import {
    StaticContext,
    RouteComponentProps,
    Route,
    useHistory,
    Redirect
} from "react-router";
import { User } from "../../../../core/entity/User";
import { useAuthError } from "../../../../util/hooks/useAuthError";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";
import { Order } from "../../../../core/entity/Order";
import { orderSearchType } from "../order/search/orderSearchType";

type orderProps = {
    order: Order;
};

type LocationState = orderProps | orderSearchType;

type componentType = (
    props?: RouteComponentProps<{}, StaticContext, LocationState>
) => JSX.Element;

type UserAuthErrorRouteProps = {
    path: string | string[];
    component: componentType;
};
export const UserAuthErrorRoute = (props: UserAuthErrorRouteProps) => {
    //ここのauthの判定はフロント側の判定ではいけない
    //routeに行くときに弾く方法と、そのrouteに到達してからget～をするときにそのAPIアクセスのエラーで弾く方法があるが
    //routeに行くときに弾く方が取り回しがよさそうに感じたので今回はこっちで,ただバック側でisAuthか判定関数を個別に作ってあげる必要がある

    const { component, ...rest } = props;

    const { location } = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const repository = new AuthCheckLaravel();
    const interactor = new AuthCheckInteractor(repository);

    const authCheckHandler = async () => {
        const res = await interactor.authCheckUser();
        console.log("response", res);
        setIsAuth(res);
        setIsLoaded(true);
    };

    useEffect(() => {
        setIsLoaded(false);
        authCheckHandler();
    }, []);

    return (
        <Route
            {...rest}
            render={() =>
                isAuth ? (
                    <Route {...props} />
                ) : isLoaded ? (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { returnURL: location.pathname }
                        }}
                    />
                ) : (
                    <CustomLoader />
                )
            }
        />
    );
};
