import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CheckOutConfirmAddress } from "./CheckOutConfirmAddress";
import { CheckOutConfirmProductMenu } from "./CheckOutConfirmProductMenu";
import { CheckOutConfirmCard } from "./CheckOutConfirmCard";
import { BorderButton } from "../../../app/util/css/BorderButton";
import { CardInteractor } from "../../../../core/usecase/CardInteractor";
import { CardLaravel } from "../../../../core/repository/card/CardLaravel";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Address } from "../../../../core/entity/Address";
import { Card } from "../../../../core/entity/Card";
import { AddressLaravel } from "../../../../core/repository/address/AddressLaravel";
import { AddressInteractor } from "../../../../core/usecase/AddressInteractor";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";
import { customMedia } from "../../../app/util/css/Media";
import { useAuthError } from "../../../../util/hooks/useAuthError";

export const CheckOutConfirm = () => {
    const history = useHistory();

    const [defaultAddress, setDefaultAddress] = useState<Address>(null);
    const [defaultCard, setDefaultCard] = useState<Card | null>(null);
    const [isAddressLoaded, setIsAddressLoaded] = useState<boolean>(false);
    const [isCardLoaded, setIsCardLoaded] = useState<boolean>(false);

    const { withAbNormalAuthErrorHandler } = useAuthError("user");

    const addressRepository = new AddressLaravel();
    const addressInteractor = new AddressInteractor(addressRepository);
    const cardRepository = new CardLaravel();
    const cardInteractor = new CardInteractor(cardRepository);

    const dispatch = useDispatch();
    const clearCart = () => {
        dispatch({
            type: "CLEARCART"
        });
    };
    const confirmHandler = async () => {
        //ここのjpyはconfigなりで取得したり、複数言語対応と合わせてあげてもいいかも
        const res = await cardInteractor.chargeAndOrder("jpy");
        if (res.isFailure()) {
            // return history.push({
            //     pathname: "/admin/error",
            //     state: { error: { errors: res.value } }
            // });
            return withAbNormalAuthErrorHandler(res.value);
        }

        clearCart();
        history.push({
            pathname: "/buyInformation",
            state: {
                order: res.value
            }
        });
    };

    const getAddresses = async () => {
        const addressRes = await addressInteractor.getDefaultAddress();
        setDefaultAddress(addressRes);
        setIsAddressLoaded(true);
    };
    const getDefaultCard = async () => {
        const res = await cardInteractor.getDefaultCard();
        setDefaultCard(res);
        setIsCardLoaded(true);
    };
    useEffect(() => {
        setIsAddressLoaded(false);
        getAddresses();
    }, []);
    useEffect(() => {
        setIsCardLoaded(false);
        getDefaultCard();
    }, []);

    const isLoaded = () => {
        return isAddressLoaded && isCardLoaded;
    };
    return (
        <ConfirmContainer>
            {!isLoaded() ? (
                <CustomLoader />
            ) : (
                <>
                    <ContentContainer>
                        <ConfirmAddressAndCardContainer>
                            <CheckOutConfirmAddress
                                defaultAddress={defaultAddress}
                            />
                            <CheckOutConfirmCard defaultCard={defaultCard} />
                        </ConfirmAddressAndCardContainer>
                        <CheckOutConfirmProductMenu />
                    </ContentContainer>
                    <ButtonContainer>
                        <BorderButton
                            paddingY={5}
                            paddingX={0.5}
                            color="grey"
                            onClick={confirmHandler}
                            data-testid="confirmOrderButton"
                        >
                            Confirm
                        </BorderButton>
                    </ButtonContainer>
                </>
            )}
        </ConfirmContainer>
    );
};
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 2rem;
    padding: 4rem;
`;
const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    ${customMedia.lessThan("breakpoint")`
        flex-direction:column;
    `}
`;
const ConfirmContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
`;
const ConfirmAddressAndCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;
    padding: 2rem;

    ${customMedia.lessThan("breakpoint")`
        width:100%;
        padding: 1rem 2rem;
    `}
`;
