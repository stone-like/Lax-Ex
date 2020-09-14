import React from "react";
import { Product } from "../../../../../core/entity/Product";
import styled from "styled-components";

type productDetailType = {
    product: Product;
};
export const ProductDetail = (props: productDetailType) => {
    const { product } = props;
    return (
        <DetailContainer>
            <DetailTitle>Detail</DetailTitle>
            <DetailContent>
                <DetailNameSpan>weight:</DetailNameSpan>
                <DetailContentSpan>{product.weight}</DetailContentSpan>
            </DetailContent>
        </DetailContainer>
    );
};
const DetailContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const DetailTitle = styled.div`
    font-size: 4rem;
`;
const DetailContent = styled.div`
    display: flex;
    margin-top: 3rem;
    padding: 0 5rem;
`;
const DetailNameSpan = styled.span`
    font-size: 1.7rem;
`;
const DetailContentSpan = styled.span`
    font-size: 2rem;
    font-weight: 600;
`;
