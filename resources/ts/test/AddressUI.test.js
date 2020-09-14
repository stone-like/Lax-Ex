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
import { CheckOutAddress } from "../ui/feature/checkout/checkOutAddressAndCard/CheckOutAddress";
import { Prefecture } from "../core/entity/Prefecture";
import userEvent from "@testing-library/user-event";
import { Core } from "yubinbango-core";

afterEach(cleanup);

jest.mock("yubinbango-core", () => {
    return {
        Core: jest.fn()
    };
});

it("can get defaultAddress And display defaultAddressValue", async () => {
    Core.mockImplementation((completeZip, callBackFn) => {
        const addr = {
            extended: "",
            locality: "千代田",
            region: "東京都",
            region_id: 1,
            street: "千代田区"
        };
        callBackFn(addr);
        return;
    });
    server.use(
        rest.get("/api/addresses", (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json(null));
        }),
        rest.post("/api/addresses", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    id: 1,
                    zip: "100-8111",
                    address1: "千代田区千代田",
                    prefecture_id: 1,
                    userName: "testName"
                })
            );
        })
    );
    //YubinBangoをmockする必要がある

    const prefectureList = [
        new Prefecture(1, "東京都"),
        new Prefecture(2, "北海道")
    ];

    const history = createMemoryHistory();
    const store = createStore(rootReducer, {});

    const {
        findByTestId,
        queryByText,
        getByText,
        debug,
        getByTestId,
        findByText,
        findByPlaceholderText,
        findByLabelText
    } = render(<CheckOutAddress prefectureList={prefectureList} />);
    //react-hooks-formのformState.isValidはisTouchとかも含まれるので、valueを入れるだけでなく、実際に入力することを模した方が良い
    const input = await findByLabelText(/Name/i);
    userEvent.type(input, "dummy");
    const postH = await findByTestId(/postCodeH/i);
    const postE = await findByTestId(/postCodeE/i);

    userEvent.type(postH, "100");
    userEvent.type(postE, "8111");

    //Address1の続きを入れなければならない
    const address1 = await findByTestId(/address1/i);
    userEvent.type(address1, "1-1");

    const button = await findByTestId(/addressMakeButton/i);

    fireEvent.click(button);
    expect(await findByText(/testName/)).toBeInTheDocument();
});

it("can add new address", async () => {
    Core.mockImplementation((completeZip, callBackFn) => {
        const addr = {
            extended: "",
            locality: "泉崎",
            region: "沖縄県",
            region_id: 2,
            street: "那覇市"
        };
        callBackFn(addr);
        return;
    });
    server.use(
        rest.get("/api/addresses", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    id: 1,
                    zip: "100-8111",
                    address1: "千代田区千代田",
                    prefectureName: "東京都",
                    userName: "testName"
                })
            );
        }),
        rest.get("/api/alladdresses", (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json([]));
        }),
        rest.post("/api/newaddresses", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        id: 2,
                        zip: "900-0021",
                        address1: "那覇市泉崎",
                        prefectureName: "沖縄県",
                        userName: "addAddressName"
                    }
                ])
            );
        })
    );
    //YubinBangoをmockする必要がある

    const prefectureList = [
        new Prefecture(1, "東京都"),
        new Prefecture(2, "沖縄県")
    ];

    const history = createMemoryHistory();
    const store = createStore(rootReducer, {});

    const {
        findByTestId,
        queryByText,
        getByText,
        debug,
        getByTestId,
        findByText,
        findByPlaceholderText,
        findByLabelText
    } = render(<CheckOutAddress prefectureList={prefectureList} />);
    //react-hooks-formのformState.isValidはisTouchとかも含まれるので、valueを入れるだけでなく、実際に入力することを模した方が良い
    const input = await findByLabelText(/Name/i);
    userEvent.type(input, "dummy");

    //エラー原因は実装過多による描画の遅れからの取得エラー？つまりfindで待ってはいるけど、後続のが実行されてしまうみたいな感じ？
    //なのでwaitForでfindで待った後→取得したものをuservent.Typeで実行

    await waitFor(async () => {
        const postH = await findByTestId(/postCodeH/i);
        userEvent.type(postH, "900");
        const postE = await findByTestId(/postCodeE/i);
        userEvent.type(postE, "0021");
    });
    await waitFor(async () => {
        const button = await findByTestId(/addressMakeButton/i);
        expect(button).not.toBeDisabled();
        fireEvent.click(button);
    });

    expect(await findByText(/testName/)).toBeInTheDocument();
    expect(await findByText(/addAddressName/)).toBeInTheDocument();
});
//deleteのtest
it("can delete other addresses", async () => {
    Core.mockImplementation((completeZip, callBackFn) => {
        const addr = {
            extended: "",
            locality: "泉崎",
            region: "沖縄県",
            region_id: 2,
            street: "那覇市"
        };
        callBackFn(addr);
        return;
    });
    server.use(
        rest.get("/api/addresses", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    id: 1,
                    zip: "100-8111",
                    address1: "千代田区千代田",
                    prefectureName: "東京都",
                    userName: "testName"
                })
            );
        }),
        rest.get("/api/alladdresses", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        id: 2,
                        zip: "900-0021",
                        address1: "那覇市泉崎",
                        prefectureName: "沖縄県",
                        userName: "addAddressName"
                    }
                ])
            );
        }),
        rest.delete(`/api/addresses/2`, (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json([]));
        })
    );
    //YubinBangoをmockする必要がある

    const prefectureList = [
        new Prefecture(1, "東京都"),
        new Prefecture(2, "沖縄県")
    ];

    const history = createMemoryHistory();
    const store = createStore(rootReducer, {});

    const {
        findByTestId,
        queryByText,
        getByText,
        debug,
        getByTestId,
        findByText,
        findByPlaceholderText,
        findByLabelText
    } = render(<CheckOutAddress prefectureList={prefectureList} />);

    //進行状況によってrenderが変わってしまう時はwaitForでそのタイミングまでまてばいいかも
    await waitFor(() => {
        expect(getByText(/delete/i)).toBeInTheDocument();
        expect(getByText(/addAddressName/)).toBeInTheDocument();
    });
    const button = await findByText(/delete/i);
    fireEvent.click(button);
    expect(await findByText(/testName/)).toBeInTheDocument();
    await waitFor(() => {
        expect(queryByText(/addAddressName/)).not.toBeInTheDocument();
    });
});

//deleteのtest
it("get default and other addresses when change default addresses", async () => {
    server.use(
        rest.get("/api/addresses", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    id: 1,
                    zip: "100-8111",
                    address1: "千代田区千代田",
                    prefectureName: "東京都",
                    userName: "testName"
                })
            );
        }),
        rest.get("/api/alladdresses", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        id: 2,
                        zip: "900-0021",
                        address1: "那覇市泉崎",
                        prefectureName: "沖縄県",
                        userName: "addAddressName"
                    }
                ])
            );
        }),
        rest.post(`/api/changeaddresses`, (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    defaultAddress: {
                        id: 2,
                        zip: "900-0021",
                        address1: "那覇市泉崎",
                        prefectureName: "沖縄県",
                        userName: "changedDefaultName"
                    },
                    otherAddresses: [
                        {
                            id: 1,
                            zip: "100-8111",
                            address1: "千代田区千代田",
                            prefectureName: "東京都",
                            userName: "otherName"
                        }
                    ]
                })
            );
        })
    );

    const prefectureList = [
        new Prefecture(1, "東京都"),
        new Prefecture(2, "沖縄県")
    ];

    const history = createMemoryHistory();
    const store = createStore(rootReducer, {});

    const {
        findByTestId,
        queryByText,
        getByText,
        debug,
        getByTestId,
        findByText,
        findByPlaceholderText,
        findByLabelText
    } = render(<CheckOutAddress prefectureList={prefectureList} />);

    //changedNameが画面内にあることを証明するだけでなく、defaultにあることを証明したい
    //defaultにid=2のchangedDefaultName、otherにid=1のotherNameがあることを確かめる
    const button = await findByText(/useThisAddress/i);
    fireEvent.click(button);

    //もとからdivのdefaultAddressNameはあるのでその存在を待ってもbuttonの反映前に取得されてしまう、
    //buttonの反映後に取得するには
    //changedDefautNameが出現するのは反映後なので、存在性を確かめた後、きちんとdefaultAddressの部分にあるかを確かめればいい(ちょっと手間だけど)

    await waitFor(async () => {
        expect(await findByText(/changedDefaultName/)).toBeInTheDocument();
        expect(await findByText(/otherName/)).toBeInTheDocument();

        const defaultAddressName = await findByTestId(/defaultAddressName/i);
        const otherAddressName = await findByTestId(/otherAddressName/i);
        expect(defaultAddressName).toHaveTextContent("changedDefaultName");
        expect(otherAddressName).toHaveTextContent("otherName");
    });
});
