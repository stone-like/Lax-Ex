import { ErrorOption } from "react-hook-form/dist/types/form";

export type setProductErrorType = (
    name:
        | "name"
        | "quantity"
        | "price"
        | "weight"
        | "category_id"
        | "description",
    error: ErrorOption
) => void;
