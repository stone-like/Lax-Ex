import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./app/layout/App";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "react-select-css/dist/react-select-css.min.css";
import "pure-react-carousel/dist/react-carousel.es.css";
// import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { Provider } from "react-redux";
import { configureStore } from "./store/configureStore";
import ReduxToastr from "react-redux-toastr";
import { PersistGate } from "redux-persist/integration/react";

import { ToastProvider } from "react-toast-notifications";

const { store } = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ToastProvider
                placement="bottom-right"
                autoDismiss={true}
                autoDismissTimeout={10000}
            >
                <App />
            </ToastProvider>
        </Router>
    </Provider>,

    document.getElementById("root")
);
