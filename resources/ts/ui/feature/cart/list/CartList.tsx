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
import { customMedia } from "../../../app/util/css/Media";

type Props = {
    cartItems: CartItem[];
    interactor: CartInteractor;
};
export const CartList = (props: Props) => {
    const { cartItems, interactor } = props;
    const dispatch = useDispatch();
    const setCart = (cart: Cart) => {
        dispatch({
            type: "SETCART",
            payload: {
                cart
            }
        });
    };

    const RemoveCartHandler = async (cartItem: CartItem) => {
        const res = await interactor.removeCartList(cartItem.rowId);

        if (res.isFailure()) {
            //通常発生しないvalidationErrorが起こった時
            return (
                <Redirect
                    to={{
                        pathname: "/admin/error",
                        state: { error: { errors: res.value } }
                    }}
                />
            );
        }

        setCart(res.value);
    };
    return (
        <>
            {cartItems.map(cartItem => {
                return (
                    <CartListContainer key={cartItem.rowId}>
                        <CartListGrid>
                            <ProductDiv>
                                <ProductContainer>
                                    <ProductImageContainer>
                                        <ProductImage
                                            src={cartItem.imagePath}
                                        />
                                    </ProductImageContainer>
                                    <ProductName>
                                        <span>{cartItem.name}</span>
                                    </ProductName>
                                    <RemoveButtonContainer>
                                        <BorderButton
                                            paddingX={0.5}
                                            paddingY={1.5}
                                            color="grey"
                                            // style={{
                                            //     margin: "auto 3rem 1rem auto"
                                            // }}

                                            onClick={() =>
                                                RemoveCartHandler(cartItem)
                                            }
                                        >
                                            remove
                                        </BorderButton>
                                    </RemoveButtonContainer>
                                </ProductContainer>
                            </ProductDiv>
                            <PriceDiv>￥{cartItem.price}</PriceDiv>
                            <QuantityDiv>
                                <QuantityButton
                                    paddingX={1}
                                    paddingY={1}
                                    rowId={cartItem.rowId}
                                    interactor={interactor}
                                    propsQuantity={cartItem.quantity}
                                />
                            </QuantityDiv>
                            <TotalDiv>￥{cartItem.subtotal}</TotalDiv>
                        </CartListGrid>
                        <Border height={1} color="grey" />
                    </CartListContainer>
                );
            })}
        </>
    );
};

const CartListGrid = styled.div`
    display: grid;
    grid-template-rows: 20rem;
    grid-template-columns: 2.8fr 1fr 1.3fr 1fr;
    grid-template-areas: "product price quantity total";

    ${customMedia.lessThan("breakpoint")`
            grid-template-columns: 1fr 1fr 1fr 1fr;
    `}
`;
const CartListContainer = styled.div`
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

    grid-template-rows: 1fr 0.5fr;
    grid-template-columns: 0.3fr 1fr;
    grid-template-areas:
        "image name"
        "image button";
    ${customMedia.lessThan("breakpoint")`
         grid-template-columns: 1fr;
         grid-template-rows: 1fr 1fr;

    `}
`;
const ProductImageContainer = styled.div`
    grid-area: image;
    ${customMedia.lessThan("breakpoint")`
        display:none;

    `} /* background-color: blue; */
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
const RemoveButtonContainer = styled.div`
    grid-area: button;
    /* background-color: green; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
