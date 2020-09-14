import React from "react";
import styled from "styled-components";
import { Border } from "../../../app/util/css/Border";
import { RootState } from "../../../store/configureStore";
import { useSelector } from "react-redux";
import { CheckOutShippingAndDiscount } from "./CheckOutShippingAndDiscount";
import { CheckOutTotal } from "./CheckOutTotal";
import { CheckOutCartColumn } from "./CheckOutCartColumn";
import { useHistory } from "react-router-dom";
import { BorderButton } from "../../../app/util/css/BorderButton";
import { customMedia } from "../../../app/util/css/Media";

export const CheckOutCart = () => {
    const cart = useSelector((state: RootState) => {
        return state.cart.cart;
    });

    const history = useHistory();
    const goToConfirmHandler = () => {
        // history.push("/checkout/confirm");
        window.location.href = "/checkout/confirm";
    };
    return (
        <CheckOutCartContainer>
            <CheckOutCartTitle>ConfirmCart</CheckOutCartTitle>
            <CartContent>
                <CheckOutCartColumn />
                <Border height={3} color="black" />
                {cart.cartItems.map(cartItem => {
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
                                    </ProductContainer>
                                </ProductDiv>
                                <PriceDiv>￥{cartItem.price}</PriceDiv>
                                <QuantityDiv>{cartItem.quantity}</QuantityDiv>
                                <TotalDiv>￥{cartItem.subtotal}</TotalDiv>
                            </CartListGrid>
                            <Border height={1} color="grey" />
                        </CartListContainer>
                    );
                })}
            </CartContent>
            <TotalAndShippingContainer>
                <CheckOutShippingAndDiscount />
                <CheckOutTotal cart={cart} />
            </TotalAndShippingContainer>
            <ButtonContainer>
                <BorderButton
                    style={{ marginLeft: "auto" }}
                    paddingY={3}
                    paddingX={1}
                    color="grey"
                    onClick={goToConfirmHandler}
                >
                    NextStep
                </BorderButton>
            </ButtonContainer>
        </CheckOutCartContainer>
    );
};
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    padding-right: 4rem;

    margin-top: 5rem;
    margin-bottom: 2rem;
`;

const TotalAndShippingContainer = styled.div`
    display: flex;
    margin-top: 3rem;
`;
const CheckOutCartContainer = styled.div`
    height: 100%;
    width: 100%;

    padding: 2rem 3rem;
    /* margin-top: 3rem; */
`;
const CartContent = styled.div`
    margin-top: 2rem;
`;
const CheckOutCartTitle = styled.div`
    font-size: 2.5rem;
`;
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
