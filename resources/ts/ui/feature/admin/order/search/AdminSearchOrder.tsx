import React, { useState, useEffect } from "react";
import {
    StaticContext,
    Redirect,
    RouteComponentProps,
    useHistory,
} from "react-router";

import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import { orderSearchType, searchOrderObjType } from "./orderSearchType";
import { AdminOrderTable } from "./AdminOrderTable";
import { OrderLaravel } from "../../../../../core/repository/order/OrderLaravel";
import { OrderInteractor } from "../../../../../core/usecase/OrderInteractor";
import { FindOrderByOrderStatus } from "./FindOrderByOrderStatus";
import { orderEntityList } from "../../../../../core/repository/order/OrderType";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

export const AdminSearchOrder = (
    props: RouteComponentProps<{}, StaticContext, orderSearchType>
) => {
    const history = useHistory();
    const searchObj = props.location.state
        ? props.location.state.searchObj
        : "";
    console.log("locationState", props.location.state);
    console.log("searchObj", searchObj);

    const [orderList, setOrderList] = useState<orderEntityList>();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const repository = new OrderLaravel();
    const interactor = new OrderInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");
    //ゆくゆくはorderの日時とかでsearchできるようにするけどとりあえず今は検索方法としてorderStatusIdによるもののみ
    const SearchFromBackend = async (searchObj: searchOrderObjType) => {
        return await interactor.findOrderByOrderStatusId(
            searchObj.orderStatusId
        );
    };
    const SetAllOrder = async () => {
        const orderList = await interactor.getAllOrder();
        setOrderList(orderList);
    };

    const SearchOrder = async () => {
        console.log(searchObj);
        if (searchObj === "") {
            await SetAllOrder();
            return;
        }

        const res = await SearchFromBackend(searchObj);
        if (res.isFailure()) {
            //通常発生しないvalidationErrorが起こった時
            withAbNormalAuthErrorHandler(res.value);
            // <Redirect
            //     to={{
            //         pathname: "/admin/error",
            //         state: { error: { errors: res.value } }
            //     }}
            // />
            return;
        }
        setOrderList(res.value); //useStateがすぐには反映されない問題
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchOrder();
    }, [searchObj]);

    useEffect(() => {
        setIsLoaded(true);
    }, [orderList]);
    return (
        <SearchOrderContainer>
            <FindOrderByOrderStatus />
            {isSearchObjLoaded ? (
                <AdminOrderTable
                    orderList={orderList}
                    setOrderList={setOrderList}
                />
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchOrderContainer>
    );
};
const SearchOrderContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
