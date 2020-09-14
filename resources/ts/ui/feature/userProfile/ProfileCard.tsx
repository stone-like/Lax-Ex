import React, { useState } from "react";
import { useCard } from "../../../util/hooks/useCard";
import { Card } from "../../../core/entity/Card";
import styled from "styled-components";

export const ProfileCard = () => {
    const [defaultCard, setDefaultCard] = useState<Card | null>(null);
    const [isCardLoaded, setIsCardLoaded] = useState<boolean>(false);
    const { makeCardForm } = useCard({
        defaultCard,
        setDefaultCard,
        isCardLoaded,
        setIsCardLoaded
    });
    return (
        <ProfileCardContainer>
            <ProfileCardWrapper>{makeCardForm()}</ProfileCardWrapper>
        </ProfileCardContainer>
    );
};

const ProfileCardContainer = styled.div`
    width: 100%;
    padding: 5rem 2rem;
    display: flex;
    justify-content: center;
`;

const ProfileCardWrapper = styled.div`
    width: 70%;
`;
