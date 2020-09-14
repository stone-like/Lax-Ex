import React, { useState } from "react";
import styled from "styled-components";
import { BorderButton } from "../../../../app/util/css/BorderButton";
import { Product } from "../../../../../core/entity/Product";
import { CartLaravel } from "../../../../../core/repository/cart/CartLaravel";
import { CartInteractor } from "../../../../../core/usecase/CartInteractor";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Cart } from "../../../../../core/entity/Cart";
import { createToastr } from "../../../../app/toastr/toastr";
import { useToasts } from "react-toast-notifications";
import { customMedia } from "../../../../app/util/css/Media";

type productCartType = {
    product: Product;
};
export const ProductCart = (props: productCartType) => {
    const { product } = props;
    const [quantity, setQuantity] = useState<number>(1);
    const repository = new CartLaravel();
    const interactor = new CartInteractor(repository);

    const openModal = (modalName: string, cart: Cart) => {
        dispatch({
            type: "OPENMODAL",
            payload: {
                modal: {
                    modalType: modalName,
                    modalProps: { cart: cart }
                }
            }
        });
    };
    const openModalHandler = (cart: Cart) => {
        openModal("CartAddedModal", cart);
    };
    // const { addToast } = useToasts();

    const dispatch = useDispatch();
    const setCart = (cart: Cart) => {
        dispatch({
            type: "SETCART",
            payload: { cart }
        });
    };

    const isDisabled = () => {
        return quantity <= 1;
    };
    const incrementQuantityHandler = () => {
        setQuantity(prev => (prev += 1));
    };
    const decrementQuantityHandler = () => {
        if (quantity <= 1) {
            return;
        }
        setQuantity(prev => (prev -= 1));
    };
    const AddCartHandler = async () => {
        const options = {
            image: product.images[0].image
        };
        const res = await interactor.addCartList(product.id, quantity, options);

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

        setCart(res.value);
        openModalHandler(res.value);
        //successfullyAddedCartを付ける
        // addToast("successfully add cart!", {
        //     appearance: "info"
        // });
    };
    return (
        <ProductCartContainer>
            <ProductInfoContainer>
                <TitlePriceContainer>
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductPrice>￥{product.price}</ProductPrice>
                </TitlePriceContainer>
                <ProductStatus>{product.status}</ProductStatus>
            </ProductInfoContainer>
            <CartButtonContainer>
                <QuantityButtonContainer>
                    <BorderButton
                        paddingX={1}
                        paddingY={1}
                        color="grey"
                        disabled={isDisabled()}
                        onClick={decrementQuantityHandler}
                    >
                        -
                    </BorderButton>
                    <BorderButton paddingX={1} paddingY={1} color="grey">
                        {quantity}
                    </BorderButton>
                    <BorderButton
                        paddingX={1}
                        paddingY={1}
                        color="grey"
                        onClick={incrementQuantityHandler}
                    >
                        +
                    </BorderButton>
                </QuantityButtonContainer>
                <BorderButton
                    paddingX={1}
                    paddingY={3}
                    color="grey"
                    style={{ margin: "1rem 3rem 1rem 2rem" }}
                    role="cartButton"
                    onClick={AddCartHandler}
                >
                    Cart
                </BorderButton>
            </CartButtonContainer>
        </ProductCartContainer>
    );
};

const ProductCartContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: auto 0;
`;

const ProductInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 3rem;
`;
const TitlePriceContainer = styled.div`
    display: flex;
    vertical-align: middle;
`;
const ProductTitle = styled.div`
    font-size: 6rem;
    /* margin-left: 5rem; */
`;
const ProductPrice = styled.div`
    font-size: 2rem;
    font-weight: 900;
    margin-left: auto;
`;
const ProductStatus = styled.div`
    font-size: 1.5rem;
    margin-top: 3rem;
    margin-left: auto;
    ${customMedia.lessThan("breakpoint")`
       margin-bottom:3rem;
       margin-left:0;
    `}
`;
const QuantityButtonContainer = styled.div`
    display: flex;
    margin: 1rem 0;
    ${customMedia.lessThan("breakpoint")`
       margin-left:auto;
    `}
`;
const CartButtonContainer = styled.div`
    margin-top: auto;
    display: flex;
    ${customMedia.lessThan("breakpoint")`
       margin-top:2rem;
    `}
`;
