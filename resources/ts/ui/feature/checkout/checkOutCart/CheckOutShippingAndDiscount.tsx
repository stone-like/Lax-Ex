import React from "react";
import { CheckOutShipping } from "./CheckOutShipping";
import { CheckOutDiscount } from "./CheckOutDiscount";
import styled from "styled-components";

export const CheckOutShippingAndDiscount = () => {
    return (
        <ShippingAndDiscountContainer>
            <CheckOutShipping />
            <CheckOutDiscount />
        </ShippingAndDiscountContainer>
    );
};

const ShippingAndDiscountContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
