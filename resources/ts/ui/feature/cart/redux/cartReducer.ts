import { cartState } from "./cartType";
import { allCartActionType, setCartPayloadType } from "./cartAction";
import { CartItem } from "../../../../core/entity/CartItem";
import { Cart } from "../../../../core/entity/Cart";

//cartにかかわるcartListからtotalまでをCart、個々のやつをCartItemとしてEntityにするかどうか
export const initialState: cartState = {
    cart: new Cart("0", 0, "0", "0", 0, "0", [])
};

const setCart = (state: cartState, payload: setCartPayloadType): cartState => {
    return {
        cart: payload.cart
    };
};
const clearCart = (state: cartState): cartState => {
    return {
        cart: new Cart("0", 0, "0", "0", 0, "0", [])
    };
};
// const addCartList = (
//     state: cartState,
//     payload: addCartPayloadType
// ): cartState => {
//     const newCartList = state.cartList.concat(payload.cartItem);
//     return {
//         ...state,
//         cartList: newCartList
//     };
// };

// const updateCartItem = (
//     state: cartState,
//     payload: updateCartItemPayloadType
// ): cartState => {
//     const targetCartItem = state.cartList.find(cartItem => {
//         return cartItem.rowId === payload.rowId;
//     });
//     const filteredCartList = state.cartList.filter(cartItem => {
//         return cartItem.rowId !== payload.rowId;
//     });
//     const newCartList = filteredCartList.concat(
//         new CartItem(
//             payload.rowId,
//             targetCartItem.imagePath,
//             payload.subtotal,
//             targetCartItem.name,
//             payload.quantity,
//             targetCartItem.price
//         )
//     );
//     return {
//         cartList: newCartList
//     };
// };
export const CartReducer = (
    state: cartState = initialState,
    action: allCartActionType
): cartState => {
    switch (action.type) {
        case "SETCART":
            return setCart(state, action.payload);
        case "CLEARCART":
            return clearCart(state);
        default:
            return state;
    }
};
