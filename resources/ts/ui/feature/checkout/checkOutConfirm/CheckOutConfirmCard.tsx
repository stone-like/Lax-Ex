import React, { useEffect, useState } from "react";
import { Card } from "../../../../core/entity/Card";
import { CardLaravel } from "../../../../core/repository/card/CardLaravel";
import { CardInteractor } from "../../../../core/usecase/CardInteractor";
import { CardInfo } from "../cardInfo/CardInfo";
import styled from "styled-components";

type Props = {
    defaultCard: Card;
};
export const CheckOutConfirmCard = (props: Props) => {
    const { defaultCard } = props;

    return (
        <CardContainer>
            {defaultCard && <CardInfo card={defaultCard} title="Card" />}
        </CardContainer>
    );
};

const CardContainer = styled.div`
    margin-top: 2rem;
`;
