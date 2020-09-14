import React, { useState } from "react";
import styled from "styled-components";
import { CartItem } from "../../../../core/entity/CartItem";
import { Border } from "../../../app/util/css/Border";
import { BorderButton } from "../../../app/util/css/BorderButton";
import { QuantityButton } from "../../../app/util/css/QuantityButton";
import { useDispatch } from "react-redux";
import { Cart } from "../../../../core/entity/Cart";
import { CartInteractor } from "../../../../core/usecase/CartInteractor";
import { Redirect } from "react-router-dom";
import Color from "../../../app/util/css/Color";

type Props = {
    cartItems: CartItem[];
    interactor: CartInteractor;
};
export const ModalCartList = (props: Props) => {
    const { cartItems, interactor } = props;

    return (
        <>
            {cartItems.map(cartItem => {
                return (
                    <CartListContainer key={cartItem.rowId}>
                        <CartListContent>
                            <ProductImageContainer>
                                <ProductImage src={cartItem.imagePath} />
                            </ProductImageContainer>
                            <NameAndDetailContainer>
                                <ProductName>{cartItem.name}</ProductName>
                                <ProductDetail>
                                    <QuantityDiv>
                                        <QuantityButton
                                            rowId={cartItem.rowId}
                                            interactor={interactor}
                                            propsQuantity={cartItem.quantity}
                                            paddingX={0.5}
                                            paddingY={0.5}
                                        />
                                    </QuantityDiv>
                                    <ProductPrice>
                                        ￥{cartItem.price}
                                    </ProductPrice>
                                </ProductDetail>
                            </NameAndDetailContainer>
                        </CartListContent>
                        <Border height={1} color={Color.border} />
                    </CartListContainer>
                );
            })}
        </>
    );
};
const NameAndDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CartListContent = styled.div`
    display: flex;
    /* grid-template-columns: 0.3fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        "image name"
        "image detail"; */

    padding: 1rem 0.5rem;
`;
const CartListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductImageContainer = styled.div`
    grid-area: image;
    /* background-color: blue; */
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
    /* padding: 2rem; */
`;
const ProductPrice = styled.div`
    font-weight: 900;

    margin-left: 1rem;
    display: flex;
    align-items: center;
`;

const QuantityDiv = styled.div`
    /* background-color: blue; */
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// const TotalDiv = styled.div`
//     grid-area: total;
//     /* background-color: green; */
//     padding: 2rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     font-weight: 900;
// `;
