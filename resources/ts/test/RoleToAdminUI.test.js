import React from "react";
import {
    cleanup,
    waitFor,
    render,
    fireEvent,
    findByPlaceholderText,
    act
} from "@testing-library/react";
import { server, rest } from "./testServer";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import rootReducer from "../ui/reducer/reducer";
import { App } from "../ui/app/layout/App";
import { setTimeout } from "timers";

afterEach(cleanup);

it("can delete From ReactState", async () => {
    server.use(
        rest.get("/api/admin/admins", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    data: [
                        {
                            id: 1,
                            name: "test1",
                            email: "test@email.com",
                            role: "admin",
                            role_id: 2,
                            permissions: []
                        }
                    ]
                })
            );
        }),
        rest.post("/api/admin/removeroles", (_req, res, ctx) => {
            return res(ctx.status(200));
        })
    );

    const history = createMemoryHistory();
    const store = createStore(rootReducer, {});

    const {
        findByTestId,
        queryByText,
        getByText,
        debug,
        getByTestId,
        findByText,
        findByLabelText
    } = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
    history.push({
        pathname: "/admin/searchadmin",
        state: {
            searchObj: {
                input: ""
            }
        }
    });
    expect(await findByText("AlreadyAssigned")).toBeInTheDocument();
    const removeButton = await findByTestId("removeRoleToAdminButton");
    fireEvent.click(removeButton);
    expect(await findByText("Assign")).toBeInTheDocument();
});

// it("error when invalid role_id and admin_id sent", async () => {
//     server.use(
//         rest.get("/api/admin/admins", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     data: [
//                         {
//                             id: 1,
//                             name: "test1",
//                             email: "test@email.com",
//                             role: "admin",
//                             role_id: 2,
//                             permissions: []
//                         }
//                     ]
//                 })
//             );
//         }),
//         rest.post("/api/admin/syncroles", (_req, res, ctx) => {
//             return res(
//                 ctx.status(422),
//                 ctx.json({
//                     errors: {
//                         role_id: ["this role_id is invalid"]
//                     }
//                 })
//             );
//         }),
//         rest.get("/api/admin/roles", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json([
//                     {
//                         id: 1,
//                         name: "testRole1"
//                     },
//                     {
//                         id: 2,
//                         name: "testRole2"
//                     }
//                 ])
//             );
//         })
//     );

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {});

//     const {
//         findByTestId,
//         queryByText,
//         getByText,
//         debug,
//         getByTestId,
//         findByText
//     } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <App />
//             </Router>
//         </Provider>
//     );
//     history.push({
//         pathname: "/admin/searchadmin",
//         state: {
//             searchObj: {
//                 input: ""
//             }
//         }
//     });
//     const syncButton = await findByTestId("syncRoleToAdminButton");
//     fireEvent.click(syncButton);

//     const select = await findByTestId("role_id");
//     //selectが変えられなくてtest出来なくなってしまっている、selectのrequiredを外したらtestは通るけど・・・、多分react-hooks-formを使ってるのが原因,roleValueに依存してしまっているせいでroleValueを変えないとundefinedになってしまう,testできないComponentになってしまっているので変えた方がいいが、それだとreact-hooks-formかあるいはsemantic-uiどどちらかはやめないといけない
//     await act(async () => {
//         fireEvent.change(select, { target: { value: 2 } });
//     });

//     const submit = await findByText(/submit/i);

//     await act(async () => {
//         fireEvent.click(submit);
//     });

//     // expect(await findByText("this role_id is invalid")).toBeInTheDocument();
// });
