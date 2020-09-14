import React, { useEffect, useState } from "react";
import { Product } from "../../../../../core/entity/Product";
import styled from "styled-components";
import { CustomLoader } from "../../../../app/util/loader/CustomLoader";
import { productEntityListType } from "../../../../../core/repository/product/ProductType";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { Redirect } from "react-router-dom";
import { ProductCard } from "../../search/ProductCard";

type productRelatedType = {
    product: Product;
};
//親コンポーネントであらかじめrelatedを取ってくるのがいいのか、それとも末端で取ってくるのが良いのか
export const ProductRelated = (props: productRelatedType) => {
    const { product } = props;
    const [isPrepared, setIsPrepared] = useState<boolean>(false);
    const [relatedProductList, setRelatedProductList] = useState<
        productEntityListType
    >([]);
    const repository = new ProductLaravel();
    const interactor = new ProductInteractor(repository);
    const getRelatedProduct = async () => {
        const res = await interactor.getRelatedProduct(
            product.categoryId,
            product.id
        );

        if (res.isFailure()) {
            //通常発生しないvalidationErrorが起こった時
            return (
                <Redirect
                    to={{
                        pathname: "/admin/error",
                        state: { error: { errors: res.value } }
                    }}
                />
            );
        }

        setRelatedProductList(res.value);
        setIsPrepared(true);
        return;
    };
    useEffect(() => {
        setIsPrepared(false);
        getRelatedProduct();
    }, []);
    return (
        <>
            {isPrepared ? (
                <RelatedContainer>
                    <RelatedTitle>you may also like...</RelatedTitle>
                    <RelatedContent>
                        {relatedProductList.map(product => (
                            <ProductCard
                                product={product}
                                key={product.id}
                                height={400}
                            />
                        ))}
                    </RelatedContent>
                </RelatedContainer>
            ) : (
                <CustomLoader />
            )}
        </>
    );
};

const RelatedContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const RelatedTitle = styled.div`
    margin-top: 7rem;
    font-size: 2rem;
`;
const RelatedContent = styled.div`
    margin-top: 5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 250px));

    grid-row-gap: 10rem;
    grid-column-gap: 10rem;
    justify-content: center;
`;
