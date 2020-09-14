import React from "react";
import styled from "styled-components";
import Zindex from "../../app/util/css/Zindex";
import { InfoProductSearch } from "./infobarComponent/InfoProductSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { InfoUserData } from "./infobarComponent/InfoUserData";
import { InfoOthers } from "./infobarComponent/InfoOthers";
import Color from "../../app/util/css/Color";

export const UserInfoBar = () => {
    const user = useSelector((state: RootState) => {
        return state.user.user;
    });
    return (
        <UserInfoBarContainer>
            <InfoUserData user={user} />
            <InfoOthers />
            <InfoProductSearch width={25} />
        </UserInfoBarContainer>
    );
};

const UserInfoBarContainer = styled.div`
    height: 10vh;
    width: 80vw;
    background-color: ${Color.mainWhite};
    z-index: ${Zindex.infobar};
    position: absolute;
    padding: 0.5rem 1rem;

    display: flex;
    align-items: center;
`;
