import React from "react";
import { Order } from "../../../core/entity/Order";
import styled from "styled-components";
import { customMedia } from "../../app/util/css/Media";

type Props = {
    order: Order;
};
export const InformationTotal = (props: Props) => {
    const { order } = props;
    return (
        <TotalContainer>
            <MainContent>
                <SubInfoContainer>
                    <div>subTotal</div> <p>￥{order.subtotal}</p>
                </SubInfoContainer>
                <SubInfoContainer>
                    <div>tax</div> <p>￥{order.tax}</p>
                </SubInfoContainer>
                <SubInfoContainer>
                    <div>discount</div> <p>￥{order.discount}</p>
                </SubInfoContainer>
                <SubInfoContainer>
                    <div>shipping </div> <p>￥{order.shipping_fee}</p>
                </SubInfoContainer>
                <MainTotalContainer>
                    <div>total</div> <p>￥{order.total}</p>
                </MainTotalContainer>
            </MainContent>
        </TotalContainer>
    );
};
const SubInfoContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 0.8rem;
    align-items: center;
    div {
        width: 80%;
        display: flex;
        justify-content: flex-end;
        ${customMedia.lessThan("breakpoint")`
            margin-right:3.5rem;
    `}
    }
    p {
        width: 20%;
        font-size: 1.5rem;
        margin-left: auto;
        display: flex;
        justify-content: flex-end;
    }
`;
const MainTotalContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 1.2rem;
    align-items: center;
    font-size: 2rem;
    div {
        width: 80%;

        display: flex;
        justify-content: flex-end;
        ${customMedia.lessThan("breakpoint")`
            margin-right:3.5rem;
    `}
    }
    p {
        width: 20%;

        font-size: 2rem;
        font-weight: 900;
        margin-left: auto;
        display: flex;
        justify-content: flex-end;
    }
`;

const TotalContainer = styled.div`
    width: 100%;
    padding: 0 2rem;
    display: flex;
    justify-content: flex-end;
`;
const MainContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
