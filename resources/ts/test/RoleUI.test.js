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

afterEach(cleanup);

it("can delete From ReactState", async () => {
    server.use(
        rest.get("/api/admin/roles", (_req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    {
                        id: 1,
                        name: "test1"
                    }
                ])
            );
        }),
        rest.delete("/api/admin/roles/1", (_req, res, ctx) => {
            return res(ctx.status(200));
        })
    );

    const history = createMemoryHistory();
    const store = createStore(rootReducer, {});

    const { findByTestId, queryByText, getByText, debug, getByTestId } = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
    history.push({
        pathname: "/admin/roles",
        state: {
            searchObj: {
                input: ""
            }
        }
    });
    const deleteButton = await findByTestId("deleteRoleButton");
    fireEvent.click(deleteButton);

    await waitFor(() => {
        expect(queryByText("test1")).not.toBeInTheDocument();
    });
});
