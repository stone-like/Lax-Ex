import React, { useEffect, useState } from "react";
import { OrderLaravel } from "../../../core/repository/order/OrderLaravel";
import { OrderInteractor } from "../../../core/usecase/OrderInteractor";
import styled from "styled-components";
import { CustomLoader } from "../../app/util/loader/CustomLoader";
import { OrderContent } from "./OrderContent";
import { orderEntityList } from "../../../core/repository/order/OrderType";

export const OrderHistory = () => {
    const repository = new OrderLaravel();
    const interactor = new OrderInteractor(repository);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [orderList, setOrderList] = useState<orderEntityList>([]);

    const getUserOrder = async () => {
        const res = await interactor.getUserOrder();
        setOrderList(res); //空の場合もあるが別にそれはエラーではない
        setIsLoaded(true);
    };

    useEffect(() => {
        setIsLoaded(false);
        getUserOrder();
    }, []);

    return (
        <OrderHistoryContainer>
            {isLoaded ? (
                <OrderContent orderList={orderList} />
            ) : (
                <CustomLoader />
            )}
        </OrderHistoryContainer>
    );
};

const OrderHistoryContainer = styled.div`
    width: 100%;
    margin-bottom: 3rem;
`;
