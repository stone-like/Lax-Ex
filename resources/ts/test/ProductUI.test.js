import {
    cleanup,
    render,
    fireEvent,
    findByText,
    waitFor
} from "@testing-library/react";
import React from "react";

import { AdminContainer } from "../ui/feature/admin/container/AdminContainer";
import { createStore } from "redux";
import rootReducer from "../ui/reducer/reducer";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { App } from "../ui/app/layout/App";
import { createMemoryHistory } from "history";
import { server, rest } from "./testServer";
import { Category } from "../core/entity/Category";
import { Product } from "../core/entity/Product";
import { AdminUpdateForm } from "../ui/feature/admin/product/update/AdminUpdateForm";
import AdminSearchProduct from "../ui/feature/admin/product/searchProduct/AdminSearchProduct";

afterEach(cleanup);

// it("redirect Error Page when invalid Search occured", async () => {
//     server.use(
//         rest.post("/api/products/searchByMultiple", (_req, res, ctx) => {
//             return res(
//                 ctx.status(422),
//                 ctx.json({
//                     errors: {
//                         category_id: ["This category_id is invalid"]
//                     }
//                 })
//             );
//         })
//     );

//     //usecase層+reduxまでproductはtestしているのでstoreをmockしてproductListを入れた状態からstartするのもありかもしれないけど...
//     const history = createMemoryHistory();
//     const store = createStore(rootReducer);

//     const { getByText, getByRole, findByText } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <App />
//             </Router>
//         </Provider>
//     );

//     //customHistoryを使う場合はBrowserRouterではなく普通のRouterをつかうらしい

//     history.push("/admin");
//     const productLink = getByText(/product/i);
//     fireEvent.click(productLink);
//     const modalButton = getByText(/advanced search/i);
//     fireEvent.click(modalButton);
//     //mockでapi返すので一応inputはフロントでのvalidation無かったらやらないでもいい？
//     //やった方がいいのは確かだけども
//     const searchButton = getByRole("advancedSearchButton");
//     fireEvent.click(searchButton);

//     expect(await findByText("This category_id is invalid")).toBeInTheDocument();
// });

// it("removed from productList when product deleted", async () => {
//     server.use(
//         rest.get("/api/categories", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json([
//                     {
//                         id: 1,
//                         name: "test1",
//                         slug: "test1",
//                         products_count: 0
//                     }
//                 ])
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {
//         category: {
//             categoryList: [new Category(1, "test1", "test1", 1)]
//         }
//     });

//     const { findByTestId, queryByText, getByText, debug } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <App />
//             </Router>
//         </Provider>
//     );
//     history.push("admin/products");
//     history.push({
//         pathname: "/admin/searchproduct",
//         state: {
//             method: "Category",
//             value: { categoryName: "test1", categoryId: 1 }
//         }
//     });

//     const deleteButton = await findByTestId(/deleteProductButton/i);
//     fireEvent.click(deleteButton);

//     //async処理で、時間がかかるdeleteという条件でfind+NotInDocumentを使ってしまうのはダメ
//     //findはasyncの中で出現するまで待つもので、そもそもdeleteは最初出現しているやつを消す操作なので、asyncはすぐに存在を検知するのでnot性がtestできない
//     // expect(await findByText("random description")).not.toBeInTheDocument();
//     //ではasyncのdelete処理をどう待つか?、waitForをつかうみたい,公式Documentにずばりそのままの使い方が出ていた、公式は大事
//     await waitFor(() => {
//         expect(queryByText("random description")).not.toBeInTheDocument();
//     });
//     history.goBack(); ///admin/productsに戻る
//     expect(await findByTestId("productCount")).toHaveTextContent(0);
// });
