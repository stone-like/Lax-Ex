import React from "react";
import styled from "styled-components";
import { Border } from "../../../app/util/css/Border";
import Color from "../../../app/util/css/Color";
import { CartProductContent } from "./CartProductContent";
import { Cart } from "../../../../core/entity/Cart";
import { BorderButton } from "../../../app/util/css/BorderButton";

type Props = {
    cart: Cart;
    CloseModalHandler: () => void;
};
export const CartAddedModalContent = (props: Props) => {
    const { cart, CloseModalHandler } = props;
    return (
        <ContentContainer>
            <ContentWrapper>
                <ContentTitle>Your Cart</ContentTitle>
                <Border height={1} color={Color.border} />
                <CartProductContent
                    cart={cart}
                    CloseModalHandler={CloseModalHandler}
                />
            </ContentWrapper>
        </ContentContainer>
    );
};

const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
`;
const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const ContentTitle = styled.div`
    font-size: 2rem;
    margin-bottom: 3rem;
`;
