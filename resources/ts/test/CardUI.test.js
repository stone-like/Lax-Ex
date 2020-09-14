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

//テストしたいことは、token取得後、きちんとdefaultCardが表示されるか、
//updateのときdefaultCardが表示されるか
//外部からのやつ(validateとかstripeを使う時は機能自体は保証されているからテストしないみたい？テストするのはintegrateして問題ないかどうかなので、validationとかtoken生成自体はmockして、全体の流れ、自分で作ったところがうまくいっているか調べてあげる)
//なので、CardElementとかcreateToken、APIはMockしてdefaultCardがUIに反映されるかどうかを調べることが今回の方針となる
afterEach(cleanup);

const mockElement = () => ({
    mount: jest.fn(),
    destroy: jest.fn(),
    on: jest.fn(),
    update: jest.fn()
});

const mockElements = () => {
    const elements = {};
    return {
        create: jest.fn(type => {
            elements[type] = mockElement();
            return elements[type];
        }),
        getElement: jest.fn(type => {
            return elements[type] || null;
        })
    };
};

const mockStripe = bool => ({
    elements: jest.fn(() => mockElements()),
    createToken: jest.fn(() => {
        return bool === true
            ? {
                  token: {
                      id: "1"
                  }
              }
            : {
                  error: {
                      message: "invalidToken"
                  }
              };
    }),
    createSource: jest.fn(),
    createPaymentMethod: jest.fn(),
    confirmCardPayment: jest.fn(),
    confirmCardSetup: jest.fn(),
    paymentRequest: jest.fn(),
    _registerWrapper: jest.fn()
});
jest.mock("@stripe/react-stripe-js", () => {
    //mockするやつだけ陽にここで作ってあげる
    const stripe = jest.requireActual("@stripe/react-stripe-js");

    return {
        ...stripe,
        Element: () => {
            return mockElement();
        },
        CardElement: () => {
            //mockするので入力は必要ないし、tokenもmockするのでcard情報のinputはいらない
            return <div>CardElement</div>;
        },
        useStripe: jest.fn(),
        useElements: () => {
            return mockElements();
        }
    };
});
// it("can get defaultCard And display defaultCardValue", async () => {
//     useStripe.mockImplementation(() => {
//         return mockStripe(true);
//     });
//     server.use(
//         rest.get("/api/payments", (_req, res, ctx) => {
//             return res(ctx.status(200), ctx.json(null));
//         }),
//         rest.post("/api/payments", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     cardlast4: "1111",
//                     brand: "DummyBrand",
//                     exp_month: 22,
//                     exp_year: 2,
//                     name: "testName"
//                 })
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {});
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
//         <Elements stripe={stripePromise}>
//             <CheckOutCard />
//         </Elements>
//     );
//     const input = await findByPlaceholderText(/cardName/i);
//     fireEvent.change(input, { target: { value: "test" } });
//     const button = getByText(/createCard/);
//     fireEvent.click(button);
//     expect(await findByText(/testName/)).toBeInTheDocument();
//     expect(await findByText(/updateCard/)).toBeInTheDocument();
// });
// it("can update defaultCard And display newCardValue", async () => {
//     useStripe.mockImplementation(() => {
//         return mockStripe(true);
//     });
//     server.use(
//         rest.get("/api/payments", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     cardlast4: "1111",
//                     brand: "DummyBrand",
//                     exp_month: 22,
//                     exp_year: 2,
//                     name: "testName"
//                 })
//             );
//         }),
//         rest.patch("/api/payments", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     cardlast4: "1111",
//                     brand: "DummyBrand",
//                     exp_month: 22,
//                     exp_year: 2,
//                     name: "updatedName"
//                 })
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {});
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
//         <Elements stripe={stripePromise}>
//             <CheckOutCard />
//         </Elements>
//     );
//     expect(await findByText(/testName/)).toBeInTheDocument();
//     const input = await findByPlaceholderText(/cardName/i);
//     fireEvent.change(input, { target: { value: "test" } });
//     const updateButton = await findByText(/updateCard/);
//     fireEvent.click(updateButton);
//     expect(await findByText(/updatedName/)).toBeInTheDocument();
// });
// it("error message occured when createTokenFn has error", async () => {
//     useStripe.mockImplementation(() => {
//         return mockStripe(false);
//     });
//     server.use(
//         rest.get("/api/payments", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     cardlast4: "1111",
//                     brand: "DummyBrand",
//                     exp_month: 22,
//                     exp_year: 2,
//                     name: "testName"
//                 })
//             );
//         }),
//         rest.patch("/api/payments", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     cardlast4: "1111",
//                     brand: "DummyBrand",
//                     exp_month: 22,
//                     exp_year: 2,
//                     name: "updatedName"
//                 })
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {});

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
//         <Elements stripe={stripePromise}>
//             <CheckOutCard />
//         </Elements>
//     );
//     const input = await findByPlaceholderText(/cardName/i);
//     fireEvent.change(input, { target: { value: "test" } });
//     const updateButton = await findByText(/updateCard/);
//     fireEvent.click(updateButton);
//     expect(await findByText(/invalidToken/i)).toBeInTheDocument();
// });

it("error message occured when createCard has error", async () => {
    useStripe.mockImplementation(() => {
        return mockStripe(true);
    });
    server.use(
        rest.get("/api/payments", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    cardlast4: "1111",
                    brand: "DummyBrand",
                    exp_month: 22,
                    exp_year: 2,
                    name: "testName"
                })
            );
        }),
        rest.patch("/api/payments", (_req, res, ctx) => {
            return res(
                ctx.status(422),
                ctx.json({
                    errors: { card: ["this card is invalid"] }
                })
            );
        })
    );

    const history = createMemoryHistory();
    const store = createStore(rootReducer, {});

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
        <Elements stripe={stripePromise}>
            <CheckOutCard />
        </Elements>
    );
    const input = await findByPlaceholderText(/cardName/i);
    fireEvent.change(input, { target: { value: "test" } });
    const updateButton = await findByText(/updateCard/);
    fireEvent.click(updateButton);
    expect(await findByText(/this card is invalid/i)).toBeInTheDocument();
});
// it("button disabled when cardName is ``", async () => {
//     useStripe.mockImplementation(() => {
//         return mockStripe(true);
//     });
//     server.use(
//         rest.get("/api/payments", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     cardlast4: "1111",
//                     brand: "DummyBrand",
//                     exp_month: 22,
//                     exp_year: 2,
//                     name: "testName"
//                 })
//             );
//         }),
//         rest.patch("/api/payments", (_req, res, ctx) => {
//             return res(
//                 ctx.status(422),
//                 ctx.json({
//                     errors: { card: ["this card is invalid"] }
//                 })
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {});

//     const stripePublishKey =
//         "pk_test_51HGhVbDGU052pg9lHFzIUSTv8kuFSgjcw8ttQtYnaLamHSARmNJs4OJKtGHRNzSskMMwoskiHhWJ7nCG3QM9yp8f001OfEzV3L";
//     const stripePromise = loadStripe(stripePublishKey);
//     const {
//         findByTestId,
//         queryByText,
//         getByText,
//         debug,
//         getByTestId,
//         findByText
//     } = render(
//         <Elements stripe={stripePromise}>
//             <CheckOutCard />
//         </Elements>
//     );
//     const updateButton = await findByTestId(/updateCardButton/i);
//     expect(updateButton).toBeDisabled();
// });
