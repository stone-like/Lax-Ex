import React, { useEffect, useState } from "react";

import { productEntityListType } from "../../../../core/repository/product/ProductType";
import { ProductLaravel } from "../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../core/usecase/ProductInteractor";
import { useHistory } from "react-router-dom";
import { ProductSlider } from "./ProductSlider";
import styled from "styled-components";
import { customMedia } from "../../../app/util/css/Media";

export const RecommendProduct = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [productList, setProductList] = useState<productEntityListType>([]);
    const history = useHistory();
    const repository = new ProductLaravel();
    const interactor = new ProductInteractor(repository);

    const getRecommendedProductHandler = async () => {
        const res = await interactor.getRecommendedProduct();

        if (res.isFailure()) {
            console.log("aaaa", res);
            return history.push({
                pathname: "/admin/error",
                state: { error: { errors: res.value } }
            });
        }
        setProductList(res.value);
        setIsLoaded(true);
    };
    useEffect(() => {
        setIsLoaded(false);
        getRecommendedProductHandler();
    }, []);
    return (
        <RecommendContainer>
            <RecommendWrapper>
                {!isLoaded ? (
                    <span></span>
                ) : (
                    <>
                        <RecommendTitle>Recommended</RecommendTitle>
                        <ProductSlider productList={productList} />
                    </>
                )}
            </RecommendWrapper>
        </RecommendContainer>
    );
};

const RecommendContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 4.5rem;
    margin-bottom: 20rem;
`;

const RecommendWrapper = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
`;
const RecommendTitle = styled.div`
    font-size: 4.5rem;
    font-weight: 900;
    display: flex;
    justify-content: flex-start;
    padding-left: 2.5rem;

    ${customMedia.lessThan("breakpoint")`
      padding-left:0;
      justify-content: center;

    `}
`;
