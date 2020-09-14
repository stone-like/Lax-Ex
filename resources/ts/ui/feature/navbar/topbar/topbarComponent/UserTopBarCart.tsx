import React from "react";
import { Cart } from "../../../../../core/entity/Cart";
import styled from "styled-components";
import Color from "../../../../app/util/css/Color";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useMenuHandler } from "../../../../../util/hooks/useMenuHandler";

type Props = {
    cart: Cart;
};
export const UserTopBarCart = (props: Props) => {
    const { cart } = props;
    const history = useHistory();
    const { MenuHandler } = useMenuHandler(false);
    const goToCartHandler = () => {
        MenuHandler("cart");
    };

    return (
        <TopBarCartContainer onClick={goToCartHandler}>
            {/* <TopBarCartWrapper> */}
            <TopBarCartLogo>
                <FaShoppingCart />
            </TopBarCartLogo>
            <TopBarCartCount>{cart.cartCount}</TopBarCartCount>

            {/* </TopBarCartWrapper> */}
        </TopBarCartContainer>
    );
};
const TopBarCartContainer = styled.div`
    margin-left: 1rem;
    display: flex;
    cursor: pointer;
    /* display: flex;
    justify-content: center;
    align-items: center; */
`;

const TopBarCartCount = styled.span`
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    background-color: ${Color.mainBlack};
    color: ${Color.mainWhite};
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: -4px;
    margin-left: -8px;
`;
const TopBarCartLogo = styled.div`
    font-size: 2.7rem;
`;
