import React from "react";
import { Card } from "../../../../core/entity/Card";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";
import { CreateCardBrand } from "./CreateCardBrand";

type Props = {
    card: Card;
    title: String;
};
export const CardInfo = (props: Props) => {
    const { card, title } = props;
    return (
        <InfoContainer>
            <InfoTitle>{title}</InfoTitle>
            <BrandAndLast4Container>
                <CreateCardBrand brand={card.brand.toLowerCase()} />
                <CardLast4>{card.cardlast4}</CardLast4>
            </BrandAndLast4Container>
            <NameContainer>
                name:<NameSpan>{card.name}</NameSpan>
            </NameContainer>
            <ExpContainer>
                expiration data:
                <ExpSpan>
                    {card.exp_month}/{card.exp_month}
                </ExpSpan>
            </ExpContainer>
        </InfoContainer>
    );
};
const InfoTitle = styled.div`
    font-size: 2rem;
`;
const InfoContainer = styled.div`
    width: 100%;
    padding: 2rem;
    border: 1px solid ${Color.border};
    margin-bottom: 4rem;
`;
const BrandAndLast4Container = styled.div`
    display: flex;
    margin-top: 2rem;
    font-size: 2.5rem;
`;
const CardLast4 = styled.div`
    margin-left: 3rem;
    font-size: 1.8rem;
`;
const NameContainer = styled.div`
    margin-top: 1rem;
`;
const NameSpan = styled.span`
    font-weight: 900;
    font-size: 2rem;
    margin-left: 1rem;
`;
const ExpContainer = styled.div`
    margin-top: 1rem;
`;
const ExpSpan = styled.span`
    font-weight: 900;
    font-size: 2rem;
    margin-left: 1rem;
`;
