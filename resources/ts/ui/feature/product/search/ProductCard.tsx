import React, { useState } from "react";
import { Product } from "../../../../core/entity/Product";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

type Props = {
    product: Product;
    height?: number;
};

type HeightProps = {
    height?: number;
};
export const ProductCard = (props: Props) => {
    const { product, height } = props;
    const history = useHistory();
    const GoToEachProductHandler = () => {
        history.push({
            pathname: `/products/${product.slug}`,
            state: {
                product_id: product.id
            }
        });
    };
    return (
        <CardContainer onClick={GoToEachProductHandler}>
            <CardImageContainer height={height}>
                <CardImage src={product.images[0].image} height={height} />
            </CardImageContainer>
            <CardPadding>
                <CardMenuContainer>
                    <CardTitle>{product.name}</CardTitle>
                    <CardStatus>{product.status}</CardStatus>
                    <CardPublishedBy>{product.slug}</CardPublishedBy>
                    <CardPrice>¥{product.price}</CardPrice>
                </CardMenuContainer>
            </CardPadding>
        </CardContainer>
    );
};

const CardContainer = styled.div`
    width: 100%;
    transition: all 0.2s ease-in-out;
    box-shadow: 13px 13px 21px 2px rgba(143, 143, 143, 0);
    &:hover {
        box-shadow: 13px 13px 21px 2px rgba(143, 143, 143, 0.71);
    }
`;
const CardImageContainer = styled.div`
    width: 100%;
    /* height: 400px; */
    height: ${(props: HeightProps) => {
        return props.height ? `${props.height}px` : "auto";
    }};
    overflow: hidden;
`;
const CardImage = styled.img`
    width: 100%;
    /* height: 400px; */
    height: ${(props: HeightProps) => {
        return props.height ? `${props.height}px` : "auto";
    }};

    display: block;
    /* object-fit: cover; */

    transition: all 0.2s ease-in-out;
    transform: scale(1, 1);
    ${CardContainer}:hover & {
        transform: scale(1.1, 1.1);
    }
`;
const CardPadding = styled.div`
    padding: 2rem 1rem;
    width: 100%;
    height: 10rem;
`;
const CardMenuContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        "title status"
        "publishedBy price";
`;

const CardTitle = styled.div`
    grid-area: title;
    /* background-color: red; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
`;
const CardStatus = styled.div`
    grid-area: status;
    /* background-color: blue; */

    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-weight: 400;
`;
const CardPublishedBy = styled.div`
    grid-area: publishedBy;
    /* background-color: yellow; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
`;
const CardPrice = styled.div`
    grid-area: price;
    /* background-color: green; */
    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-weight: 400;
`;
