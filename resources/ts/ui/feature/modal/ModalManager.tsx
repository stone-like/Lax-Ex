import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { ProductAdvancedSearchModal } from "./ProductAdvancedSearchModal";
import { UserProductAdvancedSearchModal } from "./UserProductAdvancedSearchModal";
import { AuthErrorModal } from "./AuthErrorModal";
import { CartAddedModal } from "./CartAddedModal";

export const ModalManager = () => {
    const currentModalState = useSelector((state: RootState) => {
        return state.modal.modal;
    });

    let renderedModal;
    // const { modalType, modalProps } = currentModalState;

    switch (currentModalState.modalType) {
        case "ProductAdvancedSearchModal":
            {
                renderedModal = <ProductAdvancedSearchModal />;
            }
            break;
        case "UserProductAdvancedSearchModal":
            {
                renderedModal = <UserProductAdvancedSearchModal />;
            }
            break;
        case "AuthErrorModal": {
            renderedModal = (
                <AuthErrorModal modalProps={currentModalState.modalProps} />
            );
            break;
        }
        case "CartAddedModal": {
            renderedModal = (
                <CartAddedModal modalProps={currentModalState.modalProps} />
            );
            break;
        }
        default:
            break;
    }

    return <span>{renderedModal}</span>;
};
