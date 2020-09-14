import React from "react";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";

const columnArray = ["Product", "price", "quantity", "total"];
export const CheckOutCartColumn = () => {
    return (
        <CartColumnContainer>
            <ProductDiv>PRODUCT</ProductDiv>
            <PriceDiv>PRICE</PriceDiv>
            <QuantityDiv>QUANTITY</QuantityDiv>
            <TotalDiv>TOTAL</TotalDiv>
        </CartColumnContainer>
    );
};

const CartColumnContainer = styled.div`
    display: grid;
    grid-template-rows: 5rem;
    grid-template-columns: 2.8fr 1fr 1.3fr 1fr;
    grid-template-areas: "product price quantity total";
`;

const ProductDiv = styled.div`
    grid-area: product;
    /* background-color: red; */
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 1rem 2rem;

    font-size: 1.2rem;
    color: ${Color.sidebarBlack};
`;
const PriceDiv = styled.div`
    grid-area: price;
    /* background-color: yellow; */
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 1rem 2rem;

    font-size: 1.2rem;
    color: ${Color.sidebarBlack};
`;
const QuantityDiv = styled.div`
    grid-area: quantity;
    /* background-color: blue; */
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 1rem 2rem;

    font-size: 1.2rem;
    color: ${Color.sidebarBlack};
`;
const TotalDiv = styled.div`
    grid-area: total;
    /* background-color: green; */
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 1rem 2rem;

    font-size: 1.2rem;
    color: ${Color.sidebarBlack};
`;
