import React from "react";
import {
    cleanup,
    waitFor,
    render,
    fireEvent,
    findByPlaceholderText
} from "@testing-library/react";
import { server, rest } from "./testServer";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import rootReducer from "../ui/reducer/reducer";
import { App } from "../ui/app/layout/App";
import { CheckOutAddressAndPayment } from "../ui/feature/checkout/checkOutAddressAndCard/CheckOutAddressAndCard";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe } from "@stripe/react-stripe-js";
import { CheckOutCard } from "../ui/feature/checkout/checkOutAddressAndCard/CheckOutCard";
import { CheckOutConfirm } from "../ui/feature/checkout/checkOutConfirm/CheckOutConfirm";
import { Cart } from "../core/entity/Cart";
import { CartItem } from "../core/entity/CartItem";

afterEach(cleanup);
// it("error message occured when chargeAndOrder has error", async () => {
//     server.use(
//         rest.post("/api/chargeAndOrder", (_req, res, ctx) => {
//             return res(
//                 ctx.status(422),
//                 ctx.json({
//                     errors: { card: ["this card is invalid"] }
//                 })
//             );
//         }),
//         rest.get("/api/auth", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     authCheck: true
//                 })
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {
//         cart: {
//             cart: new Cart("10", 1, "1", "0", 0, "11", [
//                 new CartItem("aaa", "", "10", "test", 1, 10)
//             ])
//         }
//     });

//     const stripePublishKey =
//         "pk_test_51HGhVbDGU052pg9lHFzIUSTv8kuFSgjcw8ttQtYnaLamHSARmNJs4OJKtGHRNzSskMMwoskiHhWJ7nCG3QM9yp8f001OfEzV3L";
//     const stripePromise = loadStripe(stripePublishKey);
//     const {
//         findByTestId,
//         queryByText,
//         getByText,
//         debug,
//         getByTestId,
//         findByText,
//         findByPlaceholderText
//     } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <Elements stripe={stripePromise}>
//                     <App />
//                 </Elements>
//             </Router>
//         </Provider>
//     );
//     history.push("/checkout/confirm");
//     const confirmButton = await findByTestId(/confirmOrderButton/i);
//     fireEvent.click(confirmButton);

//     expect(await findByText(/this card is invalid/i)).toBeInTheDocument();
// });

// it("successfully move to buyInformationPage", async () => {
//     server.use(
//         rest.post("/api/chargeAndOrder", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     subtotal: "123,400",
//                     discount: "0",
//                     tax: "12,340",
//                     shipping_fee: 0,
//                     total: "135,740",
//                     created_at: "2020-08-30 02:23:23",
//                     shipped_at: null,
//                     order_status: "shipping",
//                     address: {
//                         id: 1,
//                         zip: "333-4444",
//                         address1: "Shinjyuku 5-18-6",
//                         prefectureName: "omnis",
//                         userName: "test",
//                         address2: null,
//                         phoneNumber: null
//                     },
//                     buyProductList: [
//                         {
//                             id: 1,
//                             name: "tempora",
//                             slug: "tempora",
//                             buyQuantity: "1",
//                             price: "123400",
//                             subtotal: "123,400",
//                             imagePath: ""
//                         }
//                     ]
//                 })
//             );
//         }),
//         rest.get("/api/auth", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     authCheck: true
//                 })
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {
//         cart: {
//             cart: new Cart("10", 1, "1", "0", 0, "11", [
//                 new CartItem("aaa", "", "10", "test", 1, 10)
//             ])
//         }
//     });

//     const stripePublishKey =
//         "pk_test_51HGhVbDGU052pg9lHFzIUSTv8kuFSgjcw8ttQtYnaLamHSARmNJs4OJKtGHRNzSskMMwoskiHhWJ7nCG3QM9yp8f001OfEzV3L";
//     const stripePromise = loadStripe(stripePublishKey);
//     const {
//         findByTestId,
//         queryByText,
//         getByText,
//         debug,
//         getByTestId,
//         findByText,
//         findByPlaceholderText
//     } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <Elements stripe={stripePromise}>
//                     <App />
//                 </Elements>
//             </Router>
//         </Provider>
//     );
//     history.push("/checkout/confirm");
//     const confirmButton = await findByTestId(/confirmOrderButton/i);
//     fireEvent.click(confirmButton);

//     expect(await findByText(/tempora/i)).toBeInTheDocument();
//     expect(await findByText(/Shinjyuku 5-18-6/i)).toBeInTheDocument();
// });

it("cart is cleared after chargeAndOrder", async () => {
    server.use(
        rest.post("/api/chargeAndOrder", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    subtotal: "123,400",
                    discount: "0",
                    tax: "12,340",
                    shipping_fee: 0,
                    total: "135,740",
                    created_at: "2020-08-30 02:23:23",
                    shipped_at: null,
                    order_status: "shipping",
                    address: {
                        id: 1,
                        zip: "333-4444",
                        address1: "Shinjyuku 5-18-6",
                        prefectureName: "omnis",
                        userName: "test",
                        address2: null,
                        phoneNumber: null
                    },
                    buyProductList: [
                        {
                            id: 1,
                            name: "tempora",
                            slug: "tempora",
                            buyQuantity: "1",
                            price: "123400",
                            subtotal: "123,400",
                            imagePath: ""
                        }
                    ]
                })
            );
        }),
        rest.get("/api/auth", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    authCheck: true
                })
            );
        })
    );

    const history = createMemoryHistory();
    const store = createStore(rootReducer, {
        cart: {
            cart: new Cart("10", 1, "1", "0", 0, "11", [
                new CartItem("aaa", "", "10", "test", 1, 10)
            ])
        }
    });

    const stripePublishKey =
        "pk_test_51HGhVbDGU052pg9lHFzIUSTv8kuFSgjcw8ttQtYnaLamHSARmNJs4OJKtGHRNzSskMMwoskiHhWJ7nCG3QM9yp8f001OfEzV3L";
    const stripePromise = loadStripe(stripePublishKey);
    const {
        findByTestId,
        queryByText,
        getByText,
        debug,
        getByTestId,
        findByText,
        findByPlaceholderText
    } = render(
        <Provider store={store}>
            <Router history={history}>
                <Elements stripe={stripePromise}>
                    <App />
                </Elements>
            </Router>
        </Provider>
    );
    history.push("/checkout/confirm");
    const confirmButton = await findByTestId(/confirmOrderButton/i);
    fireEvent.click(confirmButton);

    await waitFor(async () => {
        expect(await findByText(/tempora/i)).toBeInTheDocument();
        expect(store.getState().cart.cart.cartCount).toEqual(0);
        expect(store.getState().cart.cart.total).toEqual("0");
    });
});
