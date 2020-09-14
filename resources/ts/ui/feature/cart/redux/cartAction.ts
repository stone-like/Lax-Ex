import { Cart } from "../../../../core/entity/Cart";

export type setCartPayloadType = {
    cart: Cart;
};
export type setCartType = {
    type: "SETCART";
    payload: setCartPayloadType;
};
export const setCart = (cart: Cart): setCartType => ({
    type: "SETCART",
    payload: { cart }
});

export type clearCartType = {
    type: "CLEARCART";
};
export const clearCart = (): clearCartType => ({
    type: "CLEARCART"
});

export type allCartActionType = setCartType | clearCartType;
