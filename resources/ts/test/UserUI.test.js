import {
    cleanup,
    waitFor,
    render,
    fireEvent,
    findAllByPlaceholderText
} from "@testing-library/react";
import { server, rest } from "./testServer";
import React from "react";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import rootReducer from "../ui/reducer/reducer";
import { App } from "../ui/app/layout/App";
afterEach(cleanup);
//userにcreateは今のところいらない
it("can delete user", async () => {
    server.use(
        rest.delete("/api/admin/users/1", (_req, res, ctx) => {
            return res(ctx.status(200));
        }),
        rest.get("/api/admin/users", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        id: 1,
                        name: "test",
                        email: "test@email.com",
                        permissions: [],
                        role: "undefined"
                    }
                ]) //実際返る時はdata:[{name:"test"}...]みたいになるので注意
            );
        })
    );

    const history = createMemoryHistory();
    const store = createStore(rootReducer);

    const {
        findByTestId,
        queryByText,
        getByText,
        debug,
        getByTestId,
        findByText
    } = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
    history.push({
        pathname: "/admin/users",
        state: {
            searchObj: {
                input: ""
            }
        }
    });

    expect(await findByText("test")).toBeInTheDocument();
    const deleteButton = await findByTestId("deleteUserButton");
    fireEvent.click(deleteButton);

    await waitFor(() => {
        expect(queryByText("test")).not.toBeInTheDocument();
    });
});

it("can update user", async () => {
    server.use(
        rest.patch("/api/admin/users/1", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    id: 1,
                    name: "updatedTest",
                    email: "test@email.com",
                    permissions: [],
                    role: "undefined"
                })
            );
        }),
        rest.get("/api/admin/users", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        id: 1,
                        name: "test",
                        email: "test@email.com",
                        permissions: [],
                        role: "undefined"
                    }
                ]) //実際返る時はdata:[{name:"test"}...]みたいになるので注意
            );
        })
    );

    const history = createMemoryHistory();
    const store = createStore(rootReducer);

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
                <App />
            </Router>
        </Provider>
    );
    history.push({
        pathname: "/admin/users",
        state: {
            searchObj: {
                input: ""
            }
        }
    });

    expect(await findByText("test")).toBeInTheDocument();
    const updateButton = await findByTestId("updateUserButton");

    fireEvent.click(updateButton);

    const name = await findByPlaceholderText("name");
    const email = await findByPlaceholderText("email");
    const password = await findByPlaceholderText("password");
    const password_confirmation = await findByPlaceholderText(
        "password_confirmation"
    );
    const user_id = await findByTestId("user_id");
    const submit = await findByText(/submit/i);
    fireEvent.change(name, { target: { value: "updatedTest" } });
    fireEvent.change(email, { target: { value: "test@email.com" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(password_confirmation, { target: { value: "password" } });
    fireEvent.change(user_id, { target: { value: 1 } });

    setTimeout(async () => {
        fireEvent.click(submit);
        await waitFor(() => {
            expect(getByText("updatedTest")).toBeInTheDocument();
        });
    }, 1000);
});
