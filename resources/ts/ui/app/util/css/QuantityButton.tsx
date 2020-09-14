import React, { useState } from "react";
import styled from "styled-components";
import { BorderButton } from "./BorderButton";
import { useQuantity } from "../../../../util/hooks/useQuantity";
import { CartInteractor } from "../../../../core/usecase/CartInteractor";
import { useDispatch } from "react-redux";
import { Cart } from "../../../../core/entity/Cart";
import { Redirect } from "react-router-dom";
type Props = {
    propsQuantity: number;
    interactor: CartInteractor;
    rowId: string;
    paddingX: number;
    paddingY: number;
};
export const QuantityButton = (props: Props) => {
    //updateによってreduxのstateが変わるたびに新たなpropsQuantityが送られてくるのでuseStateによる状態保持はいらなさそう
    const { propsQuantity, interactor, rowId, paddingX, paddingY } = props;
    const dispatch = useDispatch();
    const setCart = (cart: Cart) => {
        dispatch({
            type: "SETCART",
            payload: {
                cart
            }
        });
    };

    const isDisabled = () => {
        return propsQuantity <= 1;
    };

    const UpdateHandler = async (quantity: number) => {
        const res = await interactor.updateCartList(rowId, quantity);
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
        <QuantityButtonContainer>
            <BorderButton
                paddingX={paddingX}
                paddingY={paddingY}
                color="grey"
                disabled={isDisabled()}
                onClick={() => UpdateHandler(propsQuantity - 1)}
            >
                -
            </BorderButton>
            <BorderButton paddingX={paddingX} paddingY={paddingY} color="grey">
                {propsQuantity}
            </BorderButton>
            <BorderButton
                paddingX={paddingX}
                paddingY={paddingY}
                color="grey"
                onClick={() => UpdateHandler(propsQuantity + 1)}
            >
                +
            </BorderButton>
        </QuantityButtonContainer>
    );
};
const QuantityButtonContainer = styled.div`
    display: flex;
    margin: 1rem 0;
`;
