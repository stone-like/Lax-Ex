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
import { Card } from "../../../../core/entity/Card";
import { CardLaravel } from "../../../../core/repository/card/CardLaravel";
import { CardInteractor } from "../../../../core/usecase/CardInteractor";
import { Form } from "semantic-ui-react";
import { CardInfo } from "../cardInfo/CardInfo";
import styled from "styled-components";
import { BorderButton } from "../../../app/util/css/BorderButton";
import {
    InputContainer,
    InputContent,
    LabelContent,
    CheckContainer
} from "../../../app/util/css/CustomInput";
import { AiOutlineCheckSquare } from "react-icons/ai";
import Color from "../../../app/util/css/Color";
import { NormalErrorHandler } from "../../../../util/ErrorHandler";
import { useCard } from "../../../../util/hooks/useCard";
import { customMedia } from "../../../app/util/css/Media";

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
    makeCardForm: () => JSX.Element;
};
export const CheckOutCard = (props: Props) => {
    const { makeCardForm } = props;

    return (
        <CardContainer>
            <CardWrapper>
                <CardInner>{makeCardForm()}</CardInner>
            </CardWrapper>
        </CardContainer>
    );
};
const CardTitle = styled.div`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-family: "Lato", "sans-serif";
`;
const CardContainer = styled.div`
    width: 50%;
    height: 100%;
    padding: 2rem;
    ${customMedia.lessThan("breakpoint")`
            width:100%;
    `}
`;
const CardWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0rem 2rem;
`;
const CardInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const ErrorMessage = styled.p`
    font-size: 1.4rem;
    color: red;
    margin-top: 2rem;
`;
