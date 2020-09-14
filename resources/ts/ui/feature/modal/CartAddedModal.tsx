import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Color from "../../app/util/css/Color";
import Zindex from "../../app/util/css/Zindex";
import BreakPoint from "../../app/util/css/BreakPoint";
import { generateMedia } from "styled-media-query";
import { useSpring } from "react-spring";
import { cartAddedPayloadProps } from "./redux/ModalType";
import { CartAddedModalContent } from "./cart/CartAddedModalContent";
import { RootState } from "../../store/configureStore";

type openProps = {
    isOpen: boolean;
};
type Props = {
    modalProps: cartAddedPayloadProps;
};
export const CartAddedModal = (props: Props) => {
    // const { cart } = props.modalProps;

    const cart = useSelector((state: RootState) => {
        return state.cart.cart;
    });

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const CloseModal = () =>
        dispatch({
            type: "CLOSEMODAL"
        });
    const OuterContentClose = (event: React.MouseEvent<HTMLDivElement>) => {
        const input = event.target as HTMLDivElement;
        if (input.id === "modal-drop" || input.id === "modal-container") {
            // CloseModal();
            CloseModalHandler();
        }
        //外側以外クリックしてもModalが閉じないようにしている
    };
    const CloseModalHandler = () => {
        setIsOpen(false);
        setTimeout(() => {
            CloseModal();
        }, 400);
    };

    useEffect(() => {
        setIsOpen(true);
    }, []);
    return (
        <ModalDrop isOpen={isOpen} onClick={OuterContentClose} id="modal-drop">
            <ModalContainer id="modal-container">
                <CartModalWrapper isOpen={isOpen}>
                    <CartAddedModalContent
                        cart={cart}
                        CloseModalHandler={CloseModalHandler}
                    />
                </CartModalWrapper>
            </ModalContainer>
        </ModalDrop>
    );
};
export const ModalDrop = styled.div`
    z-index: ${Zindex.modalOuter};
    /* 外のz-indexより中の白いほうのをz-indexが高くなるようにする */
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    /* background: rgba(0, 0, 0, 0.8); */
    /* display:flex;
    justify-content:center;
    align-items:center; */
    transition: background-color 0.4s ease-in-out;
    background-color: ${(props: openProps) => {
        return props.isOpen ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0)";
    }};
`;
const customMedia = generateMedia({
    breakpoint: `${BreakPoint.mobile}px`
});
export const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    /* background: rgba(0, 0, 0, 0.8); */

    display: flex;
    /* justify-content: flex-end; */
`;
export const CartModalWrapper = styled.div`
    position: relative;

    left: 100%;

    width: 27rem;
    height: 100%;
    background: white;
    z-index: ${Zindex.modalInner};

    display: flex;
    flex-direction: column;

    transition: transform 0.4s ease-in-out;
    transform: ${(props: openProps) => {
        return props.isOpen ? "translateX(-100%)" : "translateX(0%)";
    }};
`;
