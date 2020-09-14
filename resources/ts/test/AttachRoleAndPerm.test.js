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
import { Admin } from "../core/entity/Admin";
import { Permission } from "../core/entity/Permission";

afterEach(cleanup);

it("address /admin/roles/:id go to ErrorPage when admin haven't createRoleAndPerm Permission", async () => {
    const history = createMemoryHistory();
    const store = createStore(rootReducer, {
        admin: {
            admin: new Admin(1, "test@email.com", "test", [], "", null, true)
        }
    });

    const { getByText, findByText } = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
    history.push("/admin/roleToAdmin");

    expect(
        await findByText(/attachRoleAndPermPermission/i)
    ).toBeInTheDocument();
});
