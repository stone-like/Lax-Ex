import React from "react";
import styled from "styled-components";
import { CheckOutCartColumn } from "../checkout/checkOutCart/CheckOutCartColumn";
import { Border } from "../../app/util/css/Border";
import { Product } from "../../../core/entity/Product";
import { Order } from "../../../core/entity/Order";
import { InformationTotal } from "./InformationTotal";
import { customMedia } from "../../app/util/css/Media";

type Props = {
    order: Order;
};
export const InformationProductList = (props: Props) => {
    const { order } = props;
    return (
        <ProductMenuContainer>
            <BuyContent>
                <CheckOutCartColumn />
                <Border height={3} color="black" />
                {order.buyProductList.map((buyProduct, index) => {
                    return (
                        <BuyListContainer key={index}>
                            <BuyListGrid>
                                <ProductDiv>
                                    <ProductContainer>
                                        <ProductImageContainer>
                                            <ProductImage
                                                src={buyProduct.imagePath}
                                            />
                                        </ProductImageContainer>
                                        <ProductName>
                                            <span>{buyProduct.name}</span>
                                        </ProductName>
                                    </ProductContainer>
                                </ProductDiv>
                                <PriceDiv>￥{buyProduct.price}</PriceDiv>
                                <QuantityDiv>
                                    {buyProduct.buyQuantity}
                                </QuantityDiv>
                                <TotalDiv>￥{buyProduct.subtotal}</TotalDiv>
                            </BuyListGrid>
                            <Border height={1} color="grey" />
                        </BuyListContainer>
                    );
                })}
            </BuyContent>
            <InformationTotal order={order} />
        </ProductMenuContainer>
    );
};
const ProductMenuContainer = styled.div`
    width: 100%;
    padding: 1.3rem 4rem 0 1rem;
    margin-top: 3rem;
    ${customMedia.lessThan("breakpoint")`
        width:100%;
        padding: 1rem 2rem;
    `}
`;

const BuyContent = styled.div`
    /* margin-top: 2rem; */
`;
const BuyListGrid = styled.div`
    display: grid;
    grid-template-rows: 20rem;
    grid-template-columns: 2.8fr 1fr 1.3fr 1fr;
    grid-template-areas: "product price quantity total";
    ${customMedia.lessThan("breakpoint")`
            grid-template-columns: 1fr 1fr 1fr 1fr;
    `}
`;
const BuyListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductDiv = styled.div`
    grid-area: product;
    /* background-color: red; */
    padding: 2rem;
    ${customMedia.lessThan("breakpoint")`
            padding:.5rem;
    `}
`;
const ProductContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;

    grid-template-rows: 1fr;
    grid-template-columns: 0.3fr 1fr;
    grid-template-areas:
        "image name"
        "image button";
    ${customMedia.lessThan("breakpoint")`
         grid-template-columns: 1fr;
         grid-template-rows: 1fr;
         grid-template-areas:
        "name name";

    `}
`;
const ProductImageContainer = styled.div`
    grid-area: image;
    /* background-color: blue; */
    ${customMedia.lessThan("breakpoint")`
        display:none;

    `}
`;
const ProductImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;
const ProductName = styled.div`
    grid-area: name;
    /* background-color: blue; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
    padding-left: 2rem;
    ${customMedia.lessThan("breakpoint")`
       justify-content:center;
       padding-left:0;
    `}
`;

const PriceDiv = styled.div`
    grid-area: price;
    /* background-color: yellow; */
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 900;
    ${customMedia.lessThan("breakpoint")`
            padding:.5rem;
    `}
`;
const QuantityDiv = styled.div`
    grid-area: quantity;
    /* background-color: blue; */
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    ${customMedia.lessThan("breakpoint")`
            padding:.5rem;
    `}
`;
const TotalDiv = styled.div`
    grid-area: total;
    /* background-color: green; */
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 900;
    ${customMedia.lessThan("breakpoint")`
            padding:.5rem;
    `}
`;
