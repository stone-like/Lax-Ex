// export type addCartFromBackEndType = {
//     data: {
//         subtotal: string;
//         quantity: number;
//         productName: string;
//         rowId: string;
//         imagePath: string;
//         price: number;
//     };
// };
// export type updateCartFromBackEndType = {
//     data: {
//         subtotal: string;
//         quantity: number;
//         rowId: string;
//         cartSubTotal: string;
//     };
// };
// export type deleteCartFromBackEndType = {
//     data: {
//         rowId: string;
//     };
// };
export type optionsType = {
    image: string;
};

export type cartItemType = {
    rowId: string;
    product_id: number;
    quantity: number;
    name: string;
    price: number;
    weight: number;
    imagePath: string;
    subtotal: string;
};
export type getCartFromBackEndType = {
    data: {
        cartSubTotal: string;
        cartCount: number;
        tax: string;
        discount: string;
        shippingFee: number;
        total: string;
        cartItems: cartItemType[];
    };
};
