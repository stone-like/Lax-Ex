import React, { useEffect } from "react";

import { Link, Switch, Route, useHistory } from "react-router-dom";

import styled from "styled-components";

import { generateMedia } from "styled-media-query";
import WithMediaComponent from "../../app/util/css/WithMediaComponent";
import BreakPoint from "../../app/util/css/BreakPoint";
import { UserSideBar } from "../navbar/sidebar/UserSideBar";
import { UserTopBar } from "../navbar/topbar/UserTopBar";
import Color from "../../app/util/css/Color";
import { UserHome } from "../home/UserHome";
import { UserSignIn } from "../auth/UserSignIn";
import { UserSignUp } from "../auth/UserSignUp";
import { UserLogout } from "../auth/UserLogout";
import { UserFooter } from "../footer/UserFooter";
import { UserSearchProduct } from "../product/search/UserSearchProduct";
import { UserInfoBar } from "../infobar/UserInfoBar";
import { DetailProductPage } from "../product/detail/DetailProductPage";
import { useMenuHandler } from "../../../util/hooks/useMenuHandler";
import { UserCart } from "../cart/UserCart";
import { CartLaravel } from "../../../core/repository/cart/CartLaravel";
import { CartInteractor } from "../../../core/usecase/CartInteractor";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "../../../core/entity/Cart";
import { CheckOut } from "../checkout/CheckOut";
import { SignInLaravel } from "../../../core/repository/signIn/SignInLaravel";
import { SignInInteractor } from "../../../core/usecase/SignInInteractor";
import { RootState } from "../../store/configureStore";
import { useUser } from "../../../util/hooks/useUser";
import { BuyInformation } from "../buyInformation/BuyInformation";
import { OrderHistory } from "../orderHistory/orderHistory";
import { UserAuthErrorRoute } from "../admin/authenticatedRoute/UserAuthErrorRoute";
import { UserProfile } from "../userProfile/UserProfile";
import { ProfileAddress } from "../userProfile/ProfileAddress";
import { ProfileCard } from "../userProfile/ProfileCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ProfileUpdateUser } from "../userProfile/ProfileUpdateUser";
import { DummyComponent } from "../../../util/DummyComponent";
import { Error } from "../../app/errorPage/Error";
import { useAdmin } from "../../../util/hooks/useAdmin";

const stripePublishKey =
    "pk_test_51HGhVbDGU052pg9lHFzIUSTv8kuFSgjcw8ttQtYnaLamHSARmNJs4OJKtGHRNzSskMMwoskiHhWJ7nCG3QM9yp8f001OfEzV3L";
const stripePromise = loadStripe(stripePublishKey);

export const UserContainer = () => {
    const SideBarOrTopBar = WithMediaComponent(
        UserSideBar,
        UserTopBar,
        BreakPoint.mobile
    );
    const UserInfoBarOrNull = WithMediaComponent(
        UserInfoBar,
        DummyComponent,
        BreakPoint.mobile
    );
    //reloadの際currentPageをset

    const { restoreFromLocalStorageHandler } = useUser();
    const { adminLogoutHandler } = useAdmin();
    const history = useHistory();
    const { setActivePageHandler } = useMenuHandler(false);
    const getPathName = (path: string): string => {
        return path.replace("/", "");
    };

    const user = useSelector((state: RootState) => {
        return state.user.user;
    });

    const cartRepository = new CartLaravel();
    const cartInteractor = new CartInteractor(cartRepository);
    const dispatch = useDispatch();
    const setCart = (cart: Cart) => {
        dispatch({
            type: "SETCART",
            payload: {
                cart
            }
        });
    };
    const getCartHandler = async () => {
        const res = await cartInteractor.getCart();
        setCart(res);
    };
    useEffect(() => {
        const pathname = getPathName(history.location.pathname);
        setActivePageHandler(pathname);
    }, []);

    useEffect(() => {
        restoreFromLocalStorageHandler();
    }, []);

    //userStateが変わったら取得しなおした方がいい、なぜなら最初renderした後にloginするときにreloadしないので、そのままだとgetCartHandlerが起動しないので期待するlogin時固有のCartをとってこれない
    useEffect(() => {
        getCartHandler();
    }, [user]);

    useEffect(() => {
        adminLogoutHandler(false)();
    }, []);
    return (
        <UserDiv>
            {SideBarOrTopBar}
            <Elements stripe={stripePromise}>
                <MainContainer>
                    {UserInfoBarOrNull}
                    <MainContent>
                        <Switch>
                            <UserAuthErrorRoute
                                path="/orderHistory"
                                component={OrderHistory}
                            />
                            <UserAuthErrorRoute
                                path="/userProfile/address"
                                component={ProfileAddress}
                            />
                            <UserAuthErrorRoute
                                path="/userProfile/card"
                                component={ProfileCard}
                            />
                            <UserAuthErrorRoute
                                path="/userProfile/update"
                                component={ProfileUpdateUser}
                            />
                            <UserAuthErrorRoute
                                path="/userProfile"
                                component={UserProfile}
                            />

                            <UserAuthErrorRoute
                                path="/buyInformation"
                                component={BuyInformation}
                            />
                            <Route path="/checkout" component={CheckOut} />
                            <Route path="/error" component={Error} />
                            <Route path="/cart" component={UserCart} />
                            <Route path="/logout" component={UserLogout} />
                            <Route path="/login" component={UserSignIn} />
                            <Route path="/register" component={UserSignUp} />

                            <Route
                                path="/products/:slug"
                                component={DetailProductPage}
                            />
                            <Route
                                path="/products"
                                component={UserSearchProduct}
                            />
                            <Route
                                exact
                                path={["/", "/home"]}
                                component={UserHome}
                            />
                        </Switch>
                    </MainContent>
                    <UserFooter />
                </MainContainer>
            </Elements>
        </UserDiv>
    );
};

const customMedia = generateMedia({
    breakpointMobile: `${BreakPoint.mobile}px`
});

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;

    padding-left: 20%;
    width: 100%;
    ${customMedia.lessThan("breakpointMobile")`
       padding-left: 0%;
       padding-top:8vh;
       min-height:100vh;
       
    `}
`;

const UserDiv = styled.div`
    /* 　　ここでmin-heightをつかっているのは100%以上になるcontentが来た時、height:100%じゃ背景色が切れてしまうから。
　　min-heightであれば最低100%を確保しつつ、100%以上でも対応可能 */
    min-height: 100vh;
    width: 100vw;
    display: flex;

    ${customMedia.lessThan("breakpointMobile")`
       flex-direction:column;
    `}
`;

//mobileのときはmobile用に変更
const MainContent = styled.div`
    background-color: ${Color.mainWhite};
    min-height: 100vh;

    margin-top: 10vh;

    ${customMedia.lessThan("breakpointMobile")`
        margin-top:0vh;
       
    `}
`;
