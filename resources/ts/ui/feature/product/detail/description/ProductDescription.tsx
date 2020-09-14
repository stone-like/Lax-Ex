import React from "react";
import { Product } from "../../../../../core/entity/Product";
import styled from "styled-components";

type productDescriptionType = {
    product: Product;
};
export const ProductDescription = (props: productDescriptionType) => {
    const { product } = props;
    return (
        <DescriptionContainer>
            <DescriptionTitle>Description</DescriptionTitle>
            <DescriptionContent>{product.description}</DescriptionContent>
        </DescriptionContainer>
    );
};
const DescriptionContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const DescriptionTitle = styled.div`
    font-size: 4rem;
`;
const DescriptionContent = styled.div`
    margin-top: 3rem;
    font-size: 1.7rem;
    padding: 0 5rem;
`;
