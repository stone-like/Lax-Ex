import React from "react";
import styled from "styled-components";
import { BorderButton } from "../../../app/util/css/BorderButton";
import { CartInteractor } from "../../../../core/usecase/CartInteractor";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

type Props = {
    interactor: CartInteractor;
};
export const CartButtonContainer = (props: Props) => {
    const { interactor } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const clearReduxCart = () => {
        dispatch({
            type: "CLEARCART"
        });
    };
    const ClearCartHandler = async () => {
        await interactor.clearCartList();
        clearReduxCart();
    };

    const GoToCheckOutHandler = () => {
        history.push("/checkout");
    };

    return (
        <ButtonContainer>
            <BorderButton
                paddingX={1}
                paddingY={3}
                color="grey"
                onClick={ClearCartHandler}
            >
                ClearCart
            </BorderButton>

            <BorderButton
                paddingX={1}
                paddingY={3}
                color="grey"
                onClick={GoToCheckOutHandler}
            >
                CheckOut
            </BorderButton>
        </ButtonContainer>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 5rem;
`;
