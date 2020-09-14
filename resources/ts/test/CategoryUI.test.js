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
import { Category } from "../core/entity/Category";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import rootReducer from "../ui/reducer/reducer";
import { App } from "../ui/app/layout/App";
afterEach(cleanup);

// it("can search from Database", async () => {
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
//                     },
//                     {
//                         id: 2,
//                         name: "test2",
//                         slug: "test2",
//                         products_count: 0
//                     }
//                 ])
//             );
//         })
//     );
//     server.use(
//         rest.get("/api/category/searchBySlug", (_req, res, ctx) => {
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
//             categoryList: [
//                 new Category(1, "test1", "test1", 0),
//                 new Category(2, "test2", "test2", 0)
//             ]
//         }
//     });

//     const { findByTestId, queryByText, getByText, debug } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <App />
//             </Router>
//         </Provider>
//     );
//     history.push({
//         pathname: "/admin/searchcategory",
//         state: {
//             input: "test1"
//         }
//     });

//     await waitFor(() => {
//         expect(queryByText("test2")).not.toBeInTheDocument();
//     });
// });

// it("can delete from Redux and useState", async () => {
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
//         }),
//         rest.post("/api/categories/searchBySlug", (_req, res, ctx) => {
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
//             categoryList: [new Category(1, "test1", "test1", 0)]
//         }
//     });

//     const { findByTestId, queryByText, getByText, debug, getByTestId } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <App />
//             </Router>
//         </Provider>
//     );
//     history.push({
//         pathname: "/admin/category",
//         state: {
//             searchObj: {
//                 input: ""
//             }
//         }
//     });
//     const deleteButton = await findByTestId("deleteCategoryButton");
//     fireEvent.click(deleteButton);

//     await waitFor(() => {
//         expect(queryByText("test1")).not.toBeInTheDocument();
//     });
// });
// it("can create to Redux", async () => {
//     server.use(
//         rest.post("/api/admin/categories", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json([
//                     {
//                         id: 2,
//                         name: "test2",
//                         slug: "test2",
//                         products_count: 0
//                     }
//                 ])
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {
//         category: {
//             categoryList: [new Category(1, "test1", "test1", 0)]
//         }
//     });

//     const { findByTestId, findByText, debug, getByPlaceholderText } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <App />
//             </Router>
//         </Provider>
//     );
//     history.push({
//         pathname: "/admin/createcategory"
//     });
//     //createの場合はreactStateにaddする必要なし
//     const name = getByPlaceholderText("name");
//     fireEvent.change(name, { target: { value: "test2" } });
//     //おそらくsubmitButtonのdisableがtrueになるまでの間少しラグがある・・・これをtestでどうにかしなくてはいけない
//     //別にロジックが問題あるとかでない(本コードにdisableからableになるまで待つ処理なんて必要ない)
//     //なのでtestではsetTimeoutくらいでいい？
//     setTimeout(async () => {
//         const submitButton = await findByText(/submit/i);
//         fireEvent.click(submitButton);
//         expect(await findByText("test2")).toBeInTheDocument();
//     }, 1000);
// });
// it("can update to Redux ", async () => {
//     server.use(
//         rest.patch("/api/admin/categories/1", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json([
//                     {
//                         id: 1,
//                         name: "updatedTest",
//                         slug: "updatedTest",
//                         products_count: 0
//                     }
//                 ])
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {
//         category: {
//             categoryList: [new Category(1, "test1", "test1", 0)]
//         }
//     });

//     const {
//         findByTestId,
//         findByText,
//         debug,
//         findByPlaceholderText,
//         findByLabelText
//     } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <App />
//             </Router>
//         </Provider>
//     );
//     history.push({
//         pathname: "/admin/category",
//         state: {
//             searchObj: {
//                 input: ""
//             }
//         }
//     });

//     const updateButton = await findByTestId("updateCategoryButton");
//     fireEvent.click(updateButton);

//     const name = await findByPlaceholderText("name");
//     fireEvent.change(name, { target: { value: "updatedTest" } });
//     const select = await findByTestId("category_id");
//     fireEvent.change(select, { target: { value: 1 } }); //category_id=1
//     setTimeout(async () => {
//         const submitButton = await findByText(/submit/i);
//         fireEvent.click(submitButton);
//         expect(await findByText("updatedTest")).toBeInTheDocument();
//     }, 1000);
// });
it("error successfully appear when invalid category_id sent", async () => {
    server.use(
        rest.patch("/api/admin/categories/1", (_req, res, ctx) => {
            return res(
                ctx.status(422),
                ctx.json({
                    errors: { category_id: ["this category_id is invalid"] }
                })
            );
        })
    );

    const history = createMemoryHistory();
    const store = createStore(rootReducer, {
        category: {
            categoryList: [new Category(1, "test1", "test1", 0)]
        }
    });

    const {
        findByTestId,
        findByText,
        debug,
        findByPlaceholderText,
        findByLabelText
    } = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
    history.push({
        pathname: "/admin/category",
        state: {
            searchObj: {
                input: ""
            }
        }
    });

    const updateButton = await findByTestId("updateCategoryButton");
    fireEvent.click(updateButton);

    const name = await findByPlaceholderText("name");
    fireEvent.change(name, { target: { value: "updatedTest" } });
    const select = await findByTestId("category_id");
    fireEvent.change(select, { target: { value: 4 } }); //category_id=1
    setTimeout(async () => {
        const submitButton = await findByText(/submit/i);
        fireEvent.click(submitButton);
        expect(
            await findByText("this category_id is invalid")
        ).toBeInTheDocument();
    }, 1000);
});
