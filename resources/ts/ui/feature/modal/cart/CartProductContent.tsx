import React from "react";
import { CartLaravel } from "../../../../core/repository/cart/CartLaravel";
import { CartInteractor } from "../../../../core/usecase/CartInteractor";
import { Cart } from "../../../../core/entity/Cart";
import styled from "styled-components";
import { CartList } from "../../cart/list/CartList";
import { CartTotal } from "../../cart/total/CartTotal";
import { BorderButton } from "../../../app/util/css/BorderButton";
import { ModalCartList } from "./ModalCartList";
import { useHistory } from "react-router-dom";
import { useMenuHandler } from "../../../../util/hooks/useMenuHandler";
type Props = {
    cart: Cart;
    CloseModalHandler: () => void;
};
export const CartProductContent = (props: Props) => {
    const { cart, CloseModalHandler } = props;
    const repository = new CartLaravel();
    const interactor = new CartInteractor(repository);
    const history = useHistory();
    const { MenuHandler } = useMenuHandler(false);
    const goToCartHandler = () => {
        MenuHandler("cart");
    };

    const modalCartHandler = () => {
        CloseModalHandler();
        goToCartHandler();
    };
    return (
        <CartContainer>
            <ModalCartList cartItems={cart.cartItems} interactor={interactor} />
            <CartTotal subtotal={cart.cartSubTotal} />
            <ButtonContainer>
                <ButtonWrapper>
                    <BorderButton
                        paddingX={0.5}
                        paddingY={4}
                        color="grey"
                        style={{ marginTop: "5rem" }}
                        onClick={modalCartHandler}
                    >
                        to Cart
                    </BorderButton>
                </ButtonWrapper>
            </ButtonContainer>
        </CartContainer>
    );
};
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
const ButtonWrapper = styled.div`
    width: 60%;
`;
const CartContainer = styled.div`
    height: 100%;
    width: 100%;

    /* padding: 2rem 3rem; */
`;
