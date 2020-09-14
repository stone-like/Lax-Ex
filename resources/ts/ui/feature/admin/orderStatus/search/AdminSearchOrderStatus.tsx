import React, { useState, useEffect } from "react";
import {
    StaticContext,
    Redirect,
    RouteComponentProps,
    useHistory
} from "react-router";

import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import {
    orderStatusSearchType,
    searchOrderStatusObjType
} from "./orderStatusSearchType";
import { InputOrderStatus } from "./InputOrderStatus";
import { AdminOrderStatusTable } from "./AdminOrderStatusTable";
import { orderStatusEntityList } from "../../../../../core/repository/orderStatus/OrderStatusType";
import { OrderStatusLaravel } from "../../../../../core/repository/orderStatus/OrderStatusLaravel";
import { OrderStatusInteractor } from "../../../../../core/usecase/OrderStatusInteractor";

export const AdminSearchOrderStatus = (
    props: RouteComponentProps<{}, StaticContext, orderStatusSearchType>
) => {
    const history = useHistory();

    const searchObj = props.location.state.searchObj;
    const [orderStatusList, setOrderStatusList] = useState<
        orderStatusEntityList
    >();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const repository = new OrderStatusLaravel();
    const interactor = new OrderStatusInteractor(repository);
    const SearchFromBackend = async (searchObj: searchOrderStatusObjType) => {
        return await interactor.searchByName(searchObj.input);
    };
    const SetAllOrderStatus = async () => {
        const orderStatusList = await interactor.getAllOrderStatus();
        setOrderStatusList(orderStatusList);
    };

    const SearchOrderStatus = async () => {
        if (searchObj === undefined) {
            return;
        }
        if (searchObj.input === "") {
            await SetAllOrderStatus();

            return;
        }

        const res = await SearchFromBackend(searchObj);
        if (res.isFailure()) {
            return history.push({
                pathname: "/admin/error",
                state: { error: { errors: res.value } }
            });
        }
        setOrderStatusList(res.value); //useStateがすぐには反映されない問題
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchOrderStatus();
    }, [searchObj]);

    useEffect(() => {
        setIsLoaded(true);
    }, [orderStatusList]);
    return (
        <SearchOrderStatusContainer>
            <InputOrderStatus />
            {isSearchObjLoaded ? (
                <AdminOrderStatusTable
                    orderStatusList={orderStatusList}
                    setOrderStatusList={setOrderStatusList}
                />
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchOrderStatusContainer>
    );
};
const SearchOrderStatusContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
