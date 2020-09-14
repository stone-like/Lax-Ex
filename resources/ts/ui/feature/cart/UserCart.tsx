import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/configureStore";
import { BorderButton } from "../../app/util/css/BorderButton";
import { CartLaravel } from "../../../core/repository/cart/CartLaravel";
import { CartInteractor } from "../../../core/usecase/CartInteractor";
import styled from "styled-components";
import { CartColumn } from "./column/CartColumn";
import { CartList } from "./list/CartList";
import { CartTotal } from "./total/CartTotal";
import { CartButtonContainer } from "./buttons/CartButtonContainer";
import { Border } from "../../app/util/css/Border";

export const UserCart = () => {
    const cart = useSelector((state: RootState) => {
        return state.cart.cart;
    });

    const repository = new CartLaravel();
    const interactor = new CartInteractor(repository);
    return (
        <CartContainer>
            <CartColumn />
            <Border height={3} color="black" />
            <CartList cartItems={cart.cartItems} interactor={interactor} />
            <CartTotal subtotal={cart.cartSubTotal} />
            <CartButtonContainer interactor={interactor} />
        </CartContainer>
    );
};

const CartContainer = styled.div`
    height: 100%;
    width: 100%;

    padding: 2rem 3rem;
`;
