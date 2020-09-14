import React from "react";
import styled from "styled-components";
import { InfoProductSearch } from "../../../infobar/infobarComponent/InfoProductSearch";

type Props = {
    setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export const UserSearchMode = (props: Props) => {
    const { setIsSearchMode } = props;
    return (
        <SearchModeContainer>
            <BackContainer onClick={() => setIsSearchMode(false)}>
                <LeftArrow>←</LeftArrow>
                <BackExplain>Back</BackExplain>
            </BackContainer>
            <SearchContainer>
                <InfoProductSearch width={100} />
            </SearchContainer>
        </SearchModeContainer>
    );
};

const SearchModeContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;

const BackContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    cursor: pointer;
`;
const LeftArrow = styled.div`
    font-size: 2rem;
`;
const BackExplain = styled.div`
    margin-left: 1rem;
    font-size: 2rem;
`;
const SearchContainer = styled.div`
    padding: 1rem 2.5rem 1rem 2.5rem;
    flex: 1;
`;
