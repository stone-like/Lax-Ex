import React, { useState, useEffect } from "react";
import { ShippingLaravel } from "../../../../core/repository/shipping/ShippingLaravel";
import { ShippingInteractor } from "../../../../core/usecase/ShippingInteractor";
import { shippingEntityListType } from "../../../../core/repository/shipping/ShippingType";
import { CartLaravel } from "../../../../core/repository/cart/CartLaravel";
import { CartInteractor } from "../../../../core/usecase/CartInteractor";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Cart } from "../../../../core/entity/Cart";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";
import { useAuthError } from "../../../../util/hooks/useAuthError";

export const CheckOutShipping = () => {
    const [radioValue, setRadioValue] = useState<number>();
    const [shippingList, setShippingList] = useState<shippingEntityListType>(
        []
    );
    const shipRepository = new ShippingLaravel();
    const shipInteractor = new ShippingInteractor(shipRepository);

    const { withAbNormalAuthErrorHandler } = useAuthError("user");

    const dispatch = useDispatch();
    const setCart = (cart: Cart) => {
        dispatch({
            type: "SETCART",
            payload: {
                cart
            }
        });
    };

    const setShippingMethodHandler = async (radioValue: number) => {
        //cartControllerにアクセスしてfindshippingを使い、shippingが存在するなら、shippingをcartに加える
        const res = await shipInteractor.setShippingFee(radioValue);
        //shipとcartが絡むのでどっちのInteractorか迷う、それかCartShippingInteractorを作るか、今回はエラーがshippingのみなのでエラーに合わせてshippingInteractorにした,ただアクセスするのはCartControllerなのがちょっとわかりにくいかも
        if (res.isFailure()) {
            return (
                // <Redirect
                //     to={{
                //         pathname: "/admin/error",
                //         state: { error: res.value }
                //     }}
                // />
                withAbNormalAuthErrorHandler(res.value)
            );
        }
        setCart(res.value);
        //cartの状態を変化させる
    };
    const isChecked = (value: number) => {
        return radioValue === value;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(Number(e.target.id));
        setShippingMethodHandler(Number(e.target.id));
    };
    const getAllShipping = async () => {
        const res = await shipInteractor.getAllShippingForUser();
        console.log(res);
        setShippingList(res.shippingList);
        setRadioValue(res.defaultValue);
    };
    useEffect(() => {
        getAllShipping();
        //最初にカートのほうにdefaultShippingValueをsetしておく、あとはonChangeで変わるたびにも
    }, []);
    return (
        <AllContainer>
            <TitleContainer>SelectShippingType</TitleContainer>
            <ShippingRadioGroup>
                {shippingList.map(shipping => {
                    return (
                        <div>
                            <input
                                type="radio"
                                name={shipping.name}
                                id={shipping.id.toString()}
                                value={shipping.price}
                                checked={isChecked(shipping.id)}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChange(e)}
                            />
                            <label>{shipping.name}</label>
                        </div>
                    );
                })}
            </ShippingRadioGroup>
        </AllContainer>
    );
};
const AllContainer = styled.div``;
const TitleContainer = styled.div`
    font-size: 2rem;
`;
const ShippingRadioGroup = styled.hgroup`
    display: flex;
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid #b6b6b6;

    margin-top: 1rem;

    div {
        position: relative;
        flex: 1;
    }

    input {
        cursor: pointer;
        width: 100%;
        height: 60px;
        opacity: 0;
    }

    label {
        position: absolute;
        top: 0;
        left: 0;
        color: #b6b6b6;
        width: 100%;
        height: 100%;
        background: ${Color.mainWhite};
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        border-right: 1px solid #b6b6b6;
    }

    div:last-child label {
        border-right: 0;
    }

    input:checked + label {
        background: ${Color.focusBlack};
        font-weight: 500;
        color: #fff;
    }
`;
