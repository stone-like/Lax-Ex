import React from "react";
import { Order } from "../../../core/entity/Order";
import styled from "styled-components";
import { EachOrderContent } from "./EachOrderContent";

type Props = {
    orderList: Order[];
};
export const OrderList = (props: Props) => {
    const { orderList } = props;
    return (
        <OrderListContainer>
            {orderList.map(order => (
                <EachOrderContent order={order} />
            ))}
        </OrderListContainer>
    );
};

const OrderListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
