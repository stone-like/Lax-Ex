import React from "react";
import { Order } from "../../../core/entity/Order";
import { OrderList } from "./OrderList";
import { OrderEmpty } from "./OrderEmpty";
import styled from "styled-components";
import { customMedia } from "../../app/util/css/Media";

type Props = {
    orderList: Order[];
};
export const OrderContent = (props: Props) => {
    const { orderList } = props;

    return (
        <ContentContainer>
            <ContentTitle>OrderHistory</ContentTitle>
            {orderList.length === 0 ? (
                <OrderEmpty />
            ) : (
                <OrderList orderList={orderList} />
            )}
        </ContentContainer>
    );
};

const ContentTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 2rem;

    ${customMedia.lessThan("breakpoint")`
      margin-top:5rem;

    `}
`;
const ContentContainer = styled.div`
    width: 100%;
`;
