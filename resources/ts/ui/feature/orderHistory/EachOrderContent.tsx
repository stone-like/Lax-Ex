import React from "react";
import { Order } from "../../../core/entity/Order";
import styled from "styled-components";
import { OrderTop } from "./OrderTop";
import { OrderInfo } from "./OrderInfo";
import Color from "../../app/util/css/Color";

type Props = {
    order: Order;
};
export const EachOrderContent = (props: Props) => {
    const { order } = props;
    return (
        <OrderContentContainer>
            <OrderContentWrapper>
                <OrderTop order={order} />
                <OrderContent>
                    <OrderStatus>
                        Status:<StatusSpan>{order.order_status}</StatusSpan>
                    </OrderStatus>
                    <OrderInfo order={order} />
                </OrderContent>
            </OrderContentWrapper>
        </OrderContentContainer>
    );
};
const OrderContentContainer = styled.div`
    width: 70%;
    padding: 2rem;
    margin-top: 2rem;
`;
const OrderContentWrapper = styled.div`
    width: 100%;
    border: 1px solid ${Color.border};
`;
const OrderContent = styled.div`
    margin-top: 1.5rem;
`;
const OrderStatus = styled.div`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 1.5rem;
`;
const StatusSpan = styled.span`
    margin-left: 1.3rem;
    font-size: 2rem;
    font-weight: 900;
`;
