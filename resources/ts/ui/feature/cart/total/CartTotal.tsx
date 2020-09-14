import React from "react";
import styled from "styled-components";
import { Border } from "../../../app/util/css/Border";
import Color from "../../../app/util/css/Color";

type Props = {
    subtotal: string;
};
export const CartTotal = (props: Props) => {
    const { subtotal } = props;
    return (
        <CartTotalContainer>
            <SubTotalTitle>
                <span>SubTotal</span>
            </SubTotalTitle>
            <Border height={3} color="black" />
            <SubTotalContent>
                <span>￥{subtotal}</span>
            </SubTotalContent>
        </CartTotalContainer>
    );
};
const CartTotalContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
`;
const SubTotalTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: ${Color.sidebarBlack};
    margin-bottom: 1.5rem;
`;
const SubTotalContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;

    font-weight: 900;
`;
