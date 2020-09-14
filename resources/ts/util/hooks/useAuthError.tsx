import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { withAuthErrorType } from "../ErrorType";
import { useDispatch } from "react-redux";
import { errorHandlerType, setErrorType } from "../ErrorHandler";

export const useAuthError = (redirectTo: "user" | "admin") => {
    const dispatch = useDispatch();
    const history = useHistory();
    const openModal = (modalName: string, redirectTo: "user" | "admin") => {
        dispatch({
            type: "OPENMODAL",
            payload: {
                modal: {
                    modalType: modalName,
                    modalProps: { redirectTo }
                }
            }
        });
    };
    //userかadminで分けてあげるとよさそう
    const authErrorModalOpenHandler = () => {
        openModal("AuthErrorModal", redirectTo);
    };
    //buttonとかのauthCheckはこっち、path移動の時はAuthErrorRouteで

    //通常エラー+AuthError
    const withNormalAuthErrorHandler = (
        withAuthErrors: withAuthErrorType,
        errorHandler: errorHandlerType,
        setError: setErrorType
    ) => {
        if (withAuthErrors.auth) {
            return authErrorModalOpenHandler();
        }
        return errorHandler(withAuthErrors, setError);
    };
    //異常エラー+AuthErrorが起こるときに
    const withAbNormalAuthErrorHandler = (
        withAuthErrors: withAuthErrorType
    ) => {
        if (withAuthErrors.auth) {
            return authErrorModalOpenHandler();
        }
        //redirect先をuserErrorPageかadminErrorPageへ

        if (redirectTo === "user") {
            return history.push({
                pathname: "/error",
                state: { error: { errors: withAuthErrors } }
            });
        }

        return history.push({
            pathname: "/admin/error",
            state: { error: { errors: withAuthErrors } }
        });
    };

    return {
        withNormalAuthErrorHandler,
        withAbNormalAuthErrorHandler,
        authErrorModalOpenHandler
    };
};
