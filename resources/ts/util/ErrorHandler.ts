import React from "react";
import { errorType } from "./ErrorType";
import { ErrorOption } from "react-hook-form/dist/types/form";

type setError = (name: string, error: ErrorOption) => void;
export const errorHandler = (errors: errorType, setError: setError) => {
    //errorの一番最初だけ表示させたいので配列の最初だけを指定
    Object.entries(errors).forEach(([key, value]) => {
        if (value === undefined) {
            return;
        }
        setError(key, {
            type: "manual",
            message: value[0]
        });
    });
};

export const NormalErrorHandler = (
    errors: errorType,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    Object.entries(errors).forEach(([key, value]) => {
        if (value === undefined) {
            return;
        }

        setError(value[0]);
    });
};

export type errorHandlerType = (
    errors: errorType,
    setError: React.Dispatch<React.SetStateAction<string>> | setError
) => void;
export type setErrorType =
    | setError
    | React.Dispatch<React.SetStateAction<string>>;
