import React from "react";
import {
    cleanup,
    waitFor,
    render,
    fireEvent,
    userEvent,
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
import { persistReducer } from "redux-persist";
import { createPersistConfig } from "../ui/store/configureStore";
afterEach(cleanup);

it("persist　expired　when selected time goes", async () => {
    server.use(
        rest.post("/api/register", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    id: 1,
                    name: "test",
                    email: "test@email.com",
                    permissions: [],
                    role: "undefiend"
                })
            );
        })
    );

    const history = createMemoryHistory();

    const reducer = persistReducer(createPersistConfig(5), rootReducer);
    const store = createStore(reducer);

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
    history.push("/register");
    const name = await findByPlaceholderText(/name/);
    const email = await findByPlaceholderText(/email/);
    const password = await findByPlaceholderText(/password/);
    const password_confirmation = await findByPlaceholderText(
        /password_confirmation/
    );

    userEvent.type(name, "test");
    userEvent.type(email, "test@email.com");
    userEvent.type(password, "password");
    userEvent.type(password_confirmarion, "password_confirmarion");

    const button = await findByText(/Submit/i);

    userEvent.click(button);
    //loginしたらsidebarにuserProfileが出るのでチェック

    expect(await findByText(/userProfile/)).toBeInTheDocument();
    //再びloginやregisterが出ることをチェック
    expect(await findByText(/register/)).toBeInTheDocument();
});
