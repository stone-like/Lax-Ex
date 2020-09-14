import { cleanup } from "@testing-library/react";

import { server, rest } from "./testServer";
import { CartLaravel } from "../core/repository/cart/CartLaravel";
import { CartInteractor } from "../core/usecase/CartInteractor";
import {
    CartReducer,
    initialState as CartInitial
} from "../ui/feature/cart/redux/cartReducer";
import { CartItem } from "../core/entity/CartItem";
import { Cart } from "../core/entity/Cart";

afterEach(cleanup);
// it("set cart when add cart", async () => {
//     server.use(
//         rest.post("/api/carts", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     cartSubTotal: "10",
//                     cartCount: 1,
//                     tax: "1",
//                     discount: "0",
//                     shippingFee: 0,
//                     total: "11",
//                     cartItems: [
//                         {
//                             rowId: "aaa",
//                             product_id: 1,
//                             quantity: 1,
//                             name: "test",
//                             price: 10,
//                             weight: 300,
//                             imagePath: "",
//                             subtotal: "10"
//                         }
//                     ]
//                 })
//             );
//         })
//     );
//     const repository = new CartLaravel();
//     const interactor = new CartInteractor(repository);

//     const productId = 1;
//     const quantity = 2;
//     const res = await interactor.addCartList(productId, quantity);
//     const cartState = CartReducer(CartInitial, {
//         type: "SETCART",
//         payload: {
//             cart: res.value
//         }
//     });
//     [new CartItem("aaa", "", "10", "test", 1, 10)].forEach(
//         (cartItem, index) => {
//             expect(cartItem).toEqual(cartState.cart.cartItems[index]);
//         }
//     );
//     expect(cartState.cart.cartSubTotal).toEqual("10");
//     expect(cartState.cart.cartCount).toEqual(1);
//     expect(cartState.cart.tax).toEqual("1");
//     expect(cartState.cart.discount).toEqual("0");
//     expect(cartState.cart.shippingFee).toEqual(0);
//     expect(cartState.cart.total).toEqual("11");
// });

it("clear cart", async () => {
    const cartState = CartReducer(
        {
            cart: new Cart("10", 1, "1", "0", 0, "11", [
                new CartItem("aaa", "", "10", "test", 1, 10)
            ])
        },
        {
            type: "CLEARCART"
        }
    );

    expect(cartState.cart.cartItems).toEqual([]);

    expect(cartState.cart.cartSubTotal).toEqual("0");
    expect(cartState.cart.cartCount).toEqual(0);
    expect(cartState.cart.tax).toEqual("0");
    expect(cartState.cart.discount).toEqual("0");
    expect(cartState.cart.shippingFee).toEqual(0);
    expect(cartState.cart.total).toEqual("0");
});
