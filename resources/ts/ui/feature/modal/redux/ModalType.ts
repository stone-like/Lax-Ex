import { Product } from "../../../../core/entity/Product";
import { Cart } from "../../../../core/entity/Cart";

export type modalPayload = {
    modal:
        | productModalState
        | authErrorModalState
        | UserProductAdvancedSearchModalState
        | cartAddedModalState;
};

//reducerのstate
export type modalState = {
    modal:
        | productModalState
        | authErrorModalState
        | UserProductAdvancedSearchModalState
        | cartAddedModalState
        | initialModalState;
};

// export type productPayloadProps = { product: Product };
export type authErrorPayloadProps = { redirectTo: "user" | "admin" };
export type cartAddedPayloadProps = { cart: Cart };

export type productModalState = {
    modalType: "ProductAdvancedSearchModal";
    modalProps: null;
};
export type authErrorModalState = {
    modalType: "AuthErrorModal";
    modalProps: authErrorPayloadProps;
};
export type cartAddedModalState = {
    modalType: "CartAddedModal";
    modalProps: cartAddedPayloadProps;
};
export type UserProductAdvancedSearchModalState = {
    modalType: "UserProductAdvancedSearchModal";
    modalProps: null;
};

export type initialModalState = {
    modalType: "";
    modalProps: null;
};
