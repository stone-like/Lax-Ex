import { categoryEntityListType, categoryInputType } from "./CategoryType";
import { Result } from "../../../util/ErrorObject";
import { categoryErrorType } from "../../error/category/categoryErrorType";
import { Category } from "../../entity/Category";

export interface CategoryRepositoryInterface {
    getAllCategory: () => Promise<categoryEntityListType>;
    searchBySlug(
        slug: string
    ): Promise<Result<categoryEntityListType, unknown>>;
    deleteCategory(
        categoryId: number
    ): Promise<Result<boolean, categoryErrorType>>;
    createCategory(
        categoryObj: categoryInputType
    ): Promise<Result<Category, categoryErrorType>>;
    updateCategory(
        categoryObj: categoryInputType,
        categoryId: number
    ): Promise<Result<Category, categoryErrorType>>;
}
