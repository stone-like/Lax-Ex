import { cartItemType } from "../../repository/cart/CartType";
import { CartItem } from "../../entity/CartItem";

export const ConvertCartItemsToEntityList = (
    cartItems: cartItemType[]
): CartItem[] => {
    const cartItemEntityList = cartItems.map(cartItem => {
        return new CartItem(
            cartItem.rowId,
            cartItem.imagePath,
            cartItem.subtotal,
            cartItem.name,
            cartItem.quantity,
            cartItem.price
        );
    });

    return cartItemEntityList;
};
