import { ErrorOption } from "react-hook-form/dist/types/form";

//一応category_idErrorも入れておくけど起こることは想定していない
export type setCategoryErrorType = (
    name: "name" | "category_id",
    error: ErrorOption
) => void;
