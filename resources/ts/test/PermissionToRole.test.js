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

//react-selectだけならtest可能っぽいけど、react-hooks-formも絡むとmockも出来ない
//多分react-hooks-formかreact-seletcどちらかのぞけばtest可能なので、testをきちんとやりたいならあまり外部のを複合させて使わない方がいいのかも
// it("error when invalid role_id", async () => {
//     server.use(
//         rest.get("/api/admin/roles", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     data: [
//                         {
//                             id: 1,
//                             name: "test1",
//                             permissions: []
//                         }
//                     ]
//                 })
//             );
//         }),
//         rest.post("/api/admin/assignroles", (_req, res, ctx) => {
//             return res(
//                 ctx.status(422),
//                 ctx.json({
//                     errors: {
//                         role_id: "this is invalid role_id"
//                     }
//                 })
//             );
//         })
//     );

//     // jest.mock("react-select", () => ({ options, value, onChange }) => {
//     //     function handleChange(event) {
//     //         console.log("jestMock");
//     //         const option = options.find(
//     //             option => option.value === event.currentTarget.value
//     //         );
//     //         onChange(option);
//     //     }
//     //     return (
//     //         <select data-testid="select" value={value} onChange={handleChange}>
//     //             {options.map(({ label, value }) => (
//     //                 <option key={value} value={value}>
//     //                     {label}
//     //                 </option>
//     //             ))}
//     //         </select>
//     //     );
//     // });

//     const history = createMemoryHistory();
//     const store = createStore(rootReducer, {});

//     const {
//         findByTestId,
//         queryByText,
//         getByText,
//         debug,
//         getByTestId,
//         findByText,
//         findByLabelText,
//         findByPlaceholderText,
//         findByRole
//     } = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <App />
//             </Router>
//         </Provider>
//     );
//     history.push({
//         pathname: "/admin/permissionToRole",
//         state: {
//             searchObj: {
//                 input: ""
//             }
//         }
//     });
//     const assignButton = await findByTestId("assignPermissionToRoleButton");
//     fireEvent.click(assignButton);

//     const select = await findByRole("textbox");
//     fireEvent.change(select, { target: { value: 1 } });

//     const button = await findByText(/submit/i);
//     fireEvent.click(button);
//     expect(await findByText("this is invalid role_id")).toBeInTheDocument();
// });
