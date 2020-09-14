import React, { useState, useEffect } from "react";
import { CardInfo } from "../../ui/feature/checkout/cardInfo/CardInfo";
import styled from "styled-components";
import Color from "../../ui/app/util/css/Color";
import { Card } from "../../core/entity/Card";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { CardLaravel } from "../../core/repository/card/CardLaravel";
import { CardInteractor } from "../../core/usecase/CardInteractor";
import {
    StripeCardElementChangeEvent,
    Token,
    StripeError
} from "@stripe/stripe-js";
import { BorderButton } from "../../ui/app/util/css/BorderButton";
import {
    InputContainer,
    InputContent,
    LabelContent,
    CheckContainer
} from "../../ui/app/util/css/CustomInput";
import { NormalErrorHandler } from "../ErrorHandler";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { CustomLoader } from "../../ui/app/util/loader/CustomLoader";
import { useAuthError } from "./useAuthError";

type iconStyleType = "solid" | "default";
const iconStyle: iconStyleType = "solid";
const cardElementOptions = {
    style: {
        base: {
            fontSize: "16px",
            color: Color.inputContentColor,
            "::placeholder": {
                color: Color.inputContentColor
            }
        },
        invalid: {
            color: "red",
            iconColor: "FFC7EE"
        }
    },
    hidePostalCode: true,
    iconStyle: iconStyle
};
type Props = {
    defaultCard: Card;
    setDefaultCard: React.Dispatch<React.SetStateAction<Card>>;
    isCardLoaded: boolean;
    setIsCardLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};
export const useCard = (props: Props) => {
    const {
        defaultCard,
        setDefaultCard,
        isCardLoaded,
        setIsCardLoaded
    } = props;
    const stripe = useStripe();
    const elements = useElements();
    const [cardErrors, setCardErrors] = useState<string>();
    // const [defaultCard, setDefaultCard] = useState<Card | null>(null);
    const [cardName, setCardName] = useState<string>("");

    const repository = new CardLaravel();
    const interactor = new CardInteractor(repository);

    const { withNormalAuthErrorHandler } = useAuthError("user");

    //cardのerrorは普通のエラーと形式が違ってしまっているので別にするか、もしくは形式を合わせるか
    const handleCardDetailsChange = (e: StripeCardElementChangeEvent) => {
        e.error ? setCardErrors(e.error.message) : setCardErrors("");
    };
    const createTokenHandler = async () => {
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);

        const res: {
            token?: Token;
            error?: StripeError;
        } = await stripe.createToken(cardElement, { name: cardName });

        return res;
    };
    const createCardHandler = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const tokenRes = await createTokenHandler();
        if (tokenRes.error) {
            return setCardErrors(tokenRes.error.message);
        }
        const res = await interactor.createCard(tokenRes.token.id);

        if (res.isFailure()) {
            return withNormalAuthErrorHandler(
                res.value,
                NormalErrorHandler,
                setCardErrors
            );
            // return NormalErrorHandler(res.value, setCardErrors);
        }

        setDefaultCard(res.value);
    };

    const updateCardHandler = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const tokenRes = await createTokenHandler();
        if (tokenRes.error) {
            return setCardErrors(tokenRes.error.message);
        }

        const res = await interactor.updateCard(tokenRes.token.id);
        if (res.isFailure()) {
            return NormalErrorHandler(res.value, setCardErrors);
        }

        setDefaultCard(res.value);
    };

    const getDefaultCard = async () => {
        const res = await interactor.getDefaultCard();

        setDefaultCard(res);
        setIsCardLoaded(true);
    };

    useEffect(() => {
        setIsCardLoaded(false);
        getDefaultCard();
    }, []);

    const isDisabled = () => {
        return !stripe || cardName === "";
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardName(e.target.value);
    };

    const displayIsChecked = (inputName: string) => {
        switch (inputName) {
            case "cardName":
                return cardName === "" ? "" : <AiOutlineCheckSquare />;
        }
    };
    const returnCreateNewCardForm = () => {
        return (
            <>
                <CardTitle>CreateCard</CardTitle>

                <form onSubmit={createCardHandler}>
                    <CardElement
                        options={cardElementOptions}
                        onChange={handleCardDetailsChange}
                    />
                    <InputContainer style={{ marginTop: "2rem" }}>
                        <InputContent
                            type="text"
                            id="cardName"
                            name="cardName"
                            placeholder="cardName"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e)}
                        />
                        <LabelContent
                            htmlFor="cardName"
                            value={cardName}
                            name="cardName"
                        >
                            Name
                        </LabelContent>
                        <CheckContainer>
                            {displayIsChecked("cardName")}
                        </CheckContainer>
                    </InputContainer>
                    <BorderButton
                        paddingX={1}
                        paddingY={3}
                        color="grey"
                        type="submit"
                        disabled={isDisabled()}
                        data-testid="createCardButton"
                    >
                        {isDisabled() ? "disable" : "createCard"}
                    </BorderButton>
                    {cardErrors && <ErrorMessage>{cardErrors}</ErrorMessage>}
                </form>
            </>
        );
    };
    const returnUpdateCardForm = () => {
        return (
            <>
                <CardInfo card={defaultCard} title="currentUseCard" />
                {/* <CardInfo
                    card={
                        new Card("****-****-****-2244", "Visa", 9, 24, "boku")
                    }
                /> */}

                <CardTitle>UpdateCard</CardTitle>
                <form onSubmit={updateCardHandler}>
                    <CardElement
                        options={cardElementOptions}
                        onChange={handleCardDetailsChange}
                    />
                    <InputContainer style={{ marginTop: "2rem" }}>
                        <InputContent
                            type="text"
                            id="cardName"
                            placeholder="cardName"
                            name="cardName"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e)}
                        />
                        <LabelContent
                            htmlFor="cardName"
                            value={cardName}
                            name="cardName"
                        >
                            Name
                        </LabelContent>
                        <CheckContainer>
                            {displayIsChecked("cardName")}
                        </CheckContainer>
                    </InputContainer>

                    <BorderButton
                        paddingX={1}
                        paddingY={3}
                        color="grey"
                        type="submit"
                        disabled={isDisabled()}
                        data-testid="updateCardButton"
                    >
                        {isDisabled() ? "disable" : "updateCard"}
                    </BorderButton>
                    {cardErrors && <ErrorMessage>{cardErrors}</ErrorMessage>}
                </form>
            </>
        );
    };
    //formがcreateになるか、updateになるかの決定タイミングはgetDefaultCardによるloadが終わったとき
    const makeCardForm = () => {
        if (!isCardLoaded) {
            return <CustomLoader />;
        }

        return (
            <>
                {defaultCard === null
                    ? returnCreateNewCardForm()
                    : returnUpdateCardForm()}
            </>
        );
    };

    return { returnCreateNewCardForm, returnUpdateCardForm, makeCardForm };
};
const CardTitle = styled.div`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-family: "Lato", "sans-serif";
`;

const ErrorMessage = styled.p`
    font-size: 1.4rem;
    color: red;
    margin-top: 2rem;
`;
