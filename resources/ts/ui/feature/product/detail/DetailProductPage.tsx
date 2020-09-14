import React, { useEffect, useState } from "react";
import { Product } from "../../../../core/entity/Product";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, useHistory, Redirect } from "react-router";
import styled from "styled-components";
import { ProductImage } from "./image/ProductImage";
import { ProductCart } from "./cart/ProductCart";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";
import { ProductLaravel } from "../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../core/usecase/ProductInteractor";
import { ProductDescription } from "./description/ProductDescription";
import { ProductDetail } from "./detail/ProductDetail";
import { ProductRelated } from "./related/ProductRelated";
import { customMedia } from "../../../app/util/css/Media";
import { useAuthError } from "../../../../util/hooks/useAuthError";
type LocationState = {
    product_id: number;
};

type Props = RouteComponentProps<{}, StaticContext, LocationState>;
export const DetailProductPage = (props: Props) => {
    const [isProductPrepared, setIsProductPrepared] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>();
    const product_id = props.location.state.product_id;

    const repository = new ProductLaravel();
    const interactor = new ProductInteractor(repository);

    const { withAbNormalAuthErrorHandler } = useAuthError("user");
    // console.log(product);
    const GetProduct = async () => {
        const res = await interactor.getProduct(product_id);

        if (res.isFailure()) {
            //通常発生しないvalidationErrorが起こった時
            return (
                // <Redirect
                //     to={{
                //         pathname: "/admin/error",
                //         state: { error: { errors: res.value } }
                //     }}
                // />
                withAbNormalAuthErrorHandler(res.value)
            );
        }

        setProduct(res.value);
        setIsProductPrepared(true);
        return;
    };
    useEffect(() => {
        setIsProductPrepared(false);
        GetProduct();
    }, [product_id]);
    //cartRepositoryとか書く
    return (
        <>
            {isProductPrepared ? (
                <DetailProductContainer>
                    <DetailProductGrid>
                        <DetailProductImageContainer>
                            <ProductImage product={product} />
                        </DetailProductImageContainer>
                        <DetailProductCartContainer>
                            <ProductCart product={product} />
                        </DetailProductCartContainer>
                        <DetailProductDescriptionContainer>
                            <ProductDescription product={product} />
                        </DetailProductDescriptionContainer>
                        <DetailProductDetailContainer>
                            <ProductDetail product={product} />
                        </DetailProductDetailContainer>
                        <DetailProductRelatedContainer>
                            <ProductRelated product={product} />
                        </DetailProductRelatedContainer>
                    </DetailProductGrid>
                </DetailProductContainer>
            ) : (
                <CustomLoader />
            )}
        </>
    );
};

const DetailProductContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
`;

const DetailProductGrid = styled.div`
    height: 100%;
    width: 85%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
        "Image Cart"
        "Description Detail"
        "Related Related";
    ${customMedia.lessThan("breakpoint")`
     grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas:
        "Image"
        "Cart"
        "Description"
        "Detail"
        "Related";

    `}
`;

const DetailProductImageContainer = styled.div`
    grid-area: Image;
    /* background-color: red; */
    /* padding: 5rem; */
    /* ${customMedia.lessThan("breakpoint")`
     
    `} */
`;

const DetailProductCartContainer = styled.div`
    grid-area: Cart;
    /* background-color: blue; */
    padding: 30% 5% 5% 5%;
    ${customMedia.lessThan("breakpoint")`
     padding:2rem;
     margin-top:2rem;
    `}
`;

const DetailProductDescriptionContainer = styled.div`
    grid-area: Description;
    /* background-color: yellow; */
    padding: 7% 0 0 0;
    ${customMedia.lessThan("breakpoint")`
     padding:2rem;
     margin-top:2rem;

    `}
`;

const DetailProductDetailContainer = styled.div`
    grid-area: Detail;
    /* background-color: green; */
    padding: 7% 0 0 5%;
    ${customMedia.lessThan("breakpoint")`
     padding:2rem;
     margin-top:2rem;

    `}
`;

const DetailProductRelatedContainer = styled.div`
    grid-area: Related;
    /* background-color: purple; */
    padding: 3rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0 0 5rem;

    margin-bottom: 10rem;
    ${customMedia.lessThan("breakpoint")`
     padding:2rem;
    `}
`;
