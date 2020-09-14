import React, { useState, useEffect } from "react";
import {
    CardElement,
    useStripe,
    useElements,
    CardCvcElement,
    Elements
} from "@stripe/react-stripe-js";
import {
    loadStripe,
    Token,
    StripeError,
    StripeCardElementChangeEvent
} from "@stripe/stripe-js";
import { CardLaravel } from "../../../../core/repository/card/CardLaravel";
import { CardInteractor } from "../../../../core/usecase/CardInteractor";
import { Card } from "../../../../core/entity/Card";
import { CardInfo } from "../cardInfo/CardInfo";
import { Form } from "semantic-ui-react";
import { CheckOutCard } from "./CheckOutCard";
import { CheckOutAddress } from "./CheckOutAddress";
import { prefectureEntityList } from "../../../../core/repository/prefecture/PrefectureType";
import { PrefectureLaravel } from "../../../../core/repository/prefecture/PrefectureLaravel";
import { PrefectureInteractor } from "../../../../core/usecase/PrefectureInteractor";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";
import styled from "styled-components";
import { BorderButton } from "../../../app/util/css/BorderButton";
import { useHistory } from "react-router-dom";
import { Address } from "../../../../core/entity/Address";
import { addressEntityList } from "../../../../core/repository/address/AddressType";
import { useAddress } from "../../../../util/hooks/useAddress";
import { useCard } from "../../../../util/hooks/useCard";
import { customMedia } from "../../../app/util/css/Media";

export const CheckOutAddressAndCard = () => {
    const [prefectureList, setPrefectureList] = useState<prefectureEntityList>(
        []
    );

    const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
    const [otherAddresses, setOtherAddresses] = useState<addressEntityList>([]);
    const [defaultCard, setDefaultCard] = useState<Card | null>(null);

    const [isAddressLoaded, setIsAddressLoaded] = useState<boolean>(false);
    const [isCardLoaded, setIsCardLoaded] = useState<boolean>(false);

    const repository = new PrefectureLaravel();
    const interactor = new PrefectureInteractor(repository);

    //toDo:ここでdefault～をもってきて、defaultが二つともにないとnextが押せないようにするのがいいかも
    const history = useHistory();
    const getAllPrefecture = async () => {
        const res = await interactor.getAllPrefecture();
        setPrefectureList(res);
    };
    const GoToShippingAndCartHandler = () => {
        // history.push("/checkout/cart");
        window.location.href = "/checkout/cart";
    };
    const isDisabled = () => {
        return !(defaultCard && defaultAddress);
    };

    useEffect(() => {
        getAllPrefecture();
    }, []);
    const { makeAddrForm } = useAddress({
        setDefaultAddress,
        setOtherAddresses,
        prefectureList,
        isAddressLoaded,
        setIsAddressLoaded,
        defaultAddress,
        otherAddresses
    });
    const { makeCardForm } = useCard({
        defaultCard,
        setDefaultCard,
        isCardLoaded,
        setIsCardLoaded
    });
    const isLoaded = () => {
        return prefectureList.length !== 0 && isAddressLoaded && isCardLoaded;
    };
    //useAddressとuseCardをここに持ってくる必要がある
    return (
        <AddresAndCardContainer>
            <MainContent>
                {!isLoaded() ? (
                    <CustomLoader />
                ) : (
                    <>
                        <CardAndAddress>
                            <CheckOutAddress makeAddrForm={makeAddrForm} />
                            <CheckOutCard makeCardForm={makeCardForm} />
                        </CardAndAddress>
                        <ButtonContainer>
                            <BorderButton
                                style={{ marginLeft: "auto" }}
                                paddingY={3}
                                paddingX={1}
                                color="grey"
                                onClick={GoToShippingAndCartHandler}
                                disabled={isDisabled()}
                            >
                                {isDisabled() ? "Disabled" : "NextStep"}
                            </BorderButton>
                        </ButtonContainer>
                    </>
                )}
            </MainContent>
        </AddresAndCardContainer>
    );
};
const AddresAndCardContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;
const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;
const CardAndAddress = styled.div`
    display: flex;
    ${customMedia.lessThan("breakpoint")`
            flex-direction:column;
    `}
`;
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    padding-right: 4rem;

    margin-top: 5rem;
    margin-bottom: 2rem;
`;
