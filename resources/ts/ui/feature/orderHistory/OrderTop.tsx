import React from "react";
import styled from "styled-components";
import { Order } from "../../../core/entity/Order";
import { AddressInfo } from "../checkout/addressInfo/AddressInfo";
import { customMedia } from "../../app/util/css/Media";

type Props = {
    order: Order;
};
export const OrderTop = (props: Props) => {
    const { order } = props;
    return (
        <OrderTopContainer>
            <OrderTopCreatedAt>
                OrderTime:<span>{order.created_at}</span>
            </OrderTopCreatedAt>
            <OrderTopTotal>
                Total <span>￥{order.total}</span>
            </OrderTopTotal>
            <OrderTopAddressUserName>
                <TitleSpan>Ship To </TitleSpan>
                <UserNameSpan>{order.address.userName}</UserNameSpan>
                <AddressTooltip>
                    <AddressInfo
                        defaultAddress={order.address}
                        titleName="Address"
                    />
                </AddressTooltip>
            </OrderTopAddressUserName>
        </OrderTopContainer>
    );
};

const OrderTopContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 0 2rem;
    margin-top: 2rem;
    height: 2.5rem;

    ${customMedia.lessThan("breakpoint")`
     flex-direction:column;
     height:15rem;

    `}
`;
const OrderTopCreatedAt = styled.div`
    font-size: 1.5rem;

    span {
        margin-left: 1.3rem;
        font-weight: 900;
    }
    ${customMedia.lessThan("breakpoint")`
     margin-top:1.5rem;

    `}
`;
const OrderTopTotal = styled.div`
    font-size: 1.5rem;
    margin-left: 2rem;

    span {
        margin-left: 1.3rem;
        font-weight: 900;
    }
    ${customMedia.lessThan("breakpoint")`
     margin-top:1.5rem;
     margin-left:0;
    `}
`;

const TitleSpan = styled.span`
    /* vertical-align: middle; */
    display: flex;
    align-items: center;
    height: 100%;
`;
const UserNameSpan = styled.span`
    display: flex;
    align-items: center;

    margin-left: 1.3rem;
    font-weight: 900;
    font-size: 2rem;
    height: 100%;
`;
const OrderTopAddressUserName = styled.div`
    font-size: 1.5rem;

    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(transparent 90%, #4c4c4c 60%);
    margin-left: auto;

    height: 100%;

    ${customMedia.lessThan("breakpoint")`
     margin-top:1.5rem;
     margin-left:0;
     height: 15%;
    `}
`;

const AddressTooltip = styled.span`
    position: absolute;
    z-index: 1;
    top: 120%;
    left: 0;
    visibility: hidden;
    width: auto;
    white-space: nowrap;
    padding: 0.3em 0.5em;
    transition: opacity 1s;
    text-align: center;
    opacity: 0;
    color: #ffffff;
    border-radius: 6px;
    background-color: #4c4c4c;

    &::after {
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        content: " ";
        border: 5px solid transparent;
        border-bottom-color: #4c4c4c;
    }

    ${OrderTopAddressUserName}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;
