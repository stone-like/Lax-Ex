import React from "react";
import styled from "styled-components";
import { InputProduct } from "./InputProduct";
import { MultipleSearchButton } from "./MultipleSearchButton";
import { customMedia } from "../../../../app/util/css/Media";

export const SearchInputContainer = () => {
    return (
        <SearchContainer>
            <InputProduct />
            <MultipleSearchButton modalName="ProductAdvancedSearchModal" />
        </SearchContainer>
    );
};

const SearchContainer = styled.div`
    margin-bottom: 3rem;
    width: 100%;
    display: flex;

    ${customMedia.lessThan("breakpoint")`
       flex-direction:column;
    `}
`;
