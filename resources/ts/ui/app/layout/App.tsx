import React, { Fragment, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { AdminHome } from "../../feature/admin/home/AdminHome";
import { AdminContainer } from "../../feature/admin/container/AdminContainer";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { categoryEntityListType } from "../../../core/repository/category/CategoryType";
import { CategoryInteractor } from "../../../core/usecase/CategoryInteractor";
import { CategoryLaravel } from "../../../core/repository/category/CategoryLaravel";
import { RootState } from "../../store/configureStore";
import { ModalManager } from "../../feature/modal/ModalManager";
import { useCategory } from "../../../util/hooks/useCategory";
import { UserContainer } from "../../feature/container/UserContainer";
import { useMenuHandler } from "../../../util/hooks/useMenuHandler";
import { CartAddedModal } from "../../feature/modal/CartAddedModal";

export const App = () => {
    //categoryを取得

    const [, getAllCategory] = useCategory();
    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <RootContainer>
            <ModalManager />
            <Switch>
                <Route path="/admin" component={AdminContainer} />
                <Route path="/" component={UserContainer} />
            </Switch>
            {/* <Route
                path="/(.+)"
                render={() => (
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/product" component={Product} />
                        <Route path="/signUp" component={SignUpUser} />
                    </Switch>
                )}
            /> */}
        </RootContainer>
    );
};

const RootContainer = styled.div`
    width: 100vw;
    height: 100vh;
`;
