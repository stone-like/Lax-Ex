import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
    setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export const UserTopBarSearch = (props: Props) => {
    const { setIsSearchMode } = props;
    return (
        <TopBarSearchContainer>
            <AiOutlineSearch onClick={() => setIsSearchMode(true)} />
        </TopBarSearchContainer>
    );
};

const TopBarSearchContainer = styled.div`
    font-size: 2.9rem;
    margin-left: auto;
`;
