import React from "react";
import { productEntityListType } from "../../../../core/repository/product/ProductType";
import styled from "styled-components";
import { ProductCard } from "./ProductCard";

type userProductListType = {
    productList: productEntityListType;
};
export const UserProductList = (props: userProductListType) => {
    const { productList } = props;
    return (
        <GridPadding>
            <ProductListGrid>
                {productList.map(product => (
                    <ProductCard
                        product={product}
                        key={product.id}
                        height={400}
                    />
                ))}
            </ProductListGrid>
        </GridPadding>
    );
};

const GridPadding = styled.div`
    padding: 5rem 0;
    width: 100%;
    height: 100%;
`;
const ProductListGrid = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    margin: 0 auto;
    /* grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
    grid-template-columns: repeat(auto-fit, minmax(auto, 250px));

    grid-row-gap: 10rem;
    grid-column-gap: 10rem;

    justify-content: center;
`;
