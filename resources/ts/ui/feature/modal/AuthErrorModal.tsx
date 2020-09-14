import React from "react";
import {
    ModalDrop,
    ModalContainer,
    ModalWrapper,
    ModalDivider,
    ModalHeader,
    ModalContent,
    ModalActions
} from "../../app/util/css/Modal";
import { BorderButton } from "../../app/util/css/BorderButton";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineCheckSquare } from "react-icons/ai";
import Color from "../../app/util/css/Color";
import { useForm } from "react-hook-form";
import { UserLoginForm } from "../auth/form/UserLoginForm";
import { authErrorPayloadProps } from "./redux/ModalType";
import { AdminLoginForm } from "../admin/auth/form/AdminLoginForm";

type Props = {
    modalProps: authErrorPayloadProps;
};
export const AuthErrorModal = (props: Props) => {
    const { modalProps } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    // const goToLoginPage = () => {
    //     CloseModal();
    //     history.push("login");
    // };
    const CloseModal = () =>
        dispatch({
            type: "CLOSEMODAL"
        });

    const OuterContentClose = (event: React.MouseEvent<HTMLDivElement>) => {
        const input = event.target as HTMLDivElement;
        if (input.id === "modal-drop" || input.id === "modal-container") {
            CloseModal();
        }
        //外側以外クリックしてもModalが閉じないようにしている
    };

    //loginformそのまま実装した方がいいかも,twittchぽいやつでいいかな
    return (
        <ModalDrop onClick={OuterContentClose} id="modal-drop">
            <ModalContainer id="modal-container">
                {/* ここからクリックしてもmodalが閉じないようにする */}
                <ModalWrapper width={30} height={55}>
                    <LoginHeader>
                        <FiLogIn />
                        <HeaderTitle>Please Login to Lax</HeaderTitle>
                    </LoginHeader>
                    <ModalDivider />
                    <ModalContent>
                        {modalProps.redirectTo === "user" ? (
                            <UserLoginForm CloseModal={CloseModal} />
                        ) : (
                            <AdminLoginForm CloseModal={CloseModal} />
                        )}
                    </ModalContent>
                </ModalWrapper>
            </ModalContainer>
        </ModalDrop>
    );
};

const LoginHeader = styled.div`
    font-size: 2rem;
    height: 10%;
    color: ${Color.mainBlack};
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2rem 2rem;
`;
const HeaderTitle = styled.div`
    margin-left: 1.5rem;
`;
