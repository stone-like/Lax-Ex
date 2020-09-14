import React from "react";
import styled from "styled-components";
import Color from "../../app/util/css/Color";
import { useHistory } from "react-router-dom";

type Props = {
    profile: {
        title: string;
        to: string;
        icon: JSX.Element;
    };
};
export const EachProfileCard = (props: Props) => {
    const { profile } = props;

    const history = useHistory();
    const goToEachPageHandler = () => {
        history.push(profile.to);
    };
    return (
        <EachContainer onClick={goToEachPageHandler}>
            <IconContainer>
                <IconWrapper>{profile.icon}</IconWrapper>
            </IconContainer>
            <TitleContainer>{profile.title}</TitleContainer>
        </EachContainer>
    );
};

const EachContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    border-radius: 10px;
    color: ${Color.mainWhite};
    background-color: ${Color.focusBlack};

    transition: all 0.2s ease-in-out;
    transform: scale(1, 1);
    cursor: pointer;
    &:hover {
        color: ${Color.mainWhite};
        background-color: ${Color.sidebarBlack};
        transform: scale(1.1, 1.1);
    }
`;
const IconWrapper = styled.div`
    font-size: 4rem;
`;
const IconContainer = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TitleContainer = styled.div`
    height: 20%;
    width: 100%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
