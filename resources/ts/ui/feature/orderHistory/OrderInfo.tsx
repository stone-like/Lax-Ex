import React from "react";
import { Order } from "../../../core/entity/Order";
import styled from "styled-components";
import WithMediaComponent from "../../app/util/css/WithMediaComponent";
import BreakPoint from "../../app/util/css/BreakPoint";
import { customMedia } from "../../app/util/css/Media";

type Props = {
    order: Order;
};
export const OrderInfo = (props: Props) => {
    const { order } = props;

    return (
        <>
            {order.buyProductList.map(buyProduct => (
                <InfoGridContainer>
                    <ProductImageContainer>
                        <ProductImage src={buyProduct.imagePath} />
                    </ProductImageContainer>
                    <ProductName>{buyProduct.name}</ProductName>
                    <ProductDetail>
                        <ProductPrice>
                            price: <span>￥{buyProduct.price}</span>
                        </ProductPrice>
                        <ProductBuyQuantity>
                            quantity: <span>{buyProduct.buyQuantity}</span>
                        </ProductBuyQuantity>
                        <ProductSubTotal>
                            subtotal: <span>￥{buyProduct.subtotal}</span>
                        </ProductSubTotal>
                    </ProductDetail>
                </InfoGridContainer>
            ))}
        </>
    );
};

const InfoGridContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        "image name"
        "image detail";

    padding: 2rem;

    ${customMedia.lessThan("breakpoint")`
         grid-template-columns: 1fr;
         grid-template-rows: 1fr 1fr;
         grid-template-areas:
           "name"
           "detail";

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
    font-size: 2rem;
    padding-left: 2rem;
`;

const ProductDetail = styled.div`
    grid-area: detail;
    display: flex;
    padding: 2rem;
`;
const ProductPrice = styled.div`
    span {
        font-weight: 900;

        margin-left: 1rem;
    }
`;
const ProductBuyQuantity = styled.div`
    margin-left: 1.5rem;
    span {
        font-weight: 900;

        margin-left: 1rem;
    }
`;
const ProductSubTotal = styled.div`
    margin-left: 1.5rem;
    span {
        font-weight: 900;
        margin-left: 1rem;
    }
`;
