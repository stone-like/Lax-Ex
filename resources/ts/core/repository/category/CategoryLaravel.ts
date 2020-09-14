import axios from "axios";
import { CategoryRepositoryInterface } from "./CategoryRepositoryInterface";
import {
    categoryType,
    categoryEntityListType,
    categoryInputType,
    categoryListFromBackEndType,
    categoryFromBackEndType
} from "./CategoryType";
import { Category } from "../../entity/Category";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { categoryErrorType } from "../../error/category/categoryErrorType";

export class CategoryLaravel implements CategoryRepositoryInterface {
    async getAllCategory() {
        const categoryList: categoryListFromBackEndType = await axios.get(
            "/api/categories"
        );
        const categoryEntityList = categoryList.data.map(
            (category: categoryType) => {
                return new Category(
                    category.id,
                    category.name,
                    category.slug,
                    category.products_count
                );
            }
        );

        return categoryEntityList;
    }
    async searchBySlug(
        slug: string
    ): Promise<Result<categoryEntityListType, unknown>> {
        try {
            const categoryList: categoryListFromBackEndType = await axios.post(
                "/api/categories/searchBySlug",
                { slug }
            );

            const categoryEntityList = categoryList.data.map(
                (category: categoryType) => {
                    return new Category(
                        category.id,
                        category.name,
                        category.slug,
                        category.products_count
                    );
                }
            );
            return new Success(categoryEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async deleteCategory(
        categoryId: number
    ): Promise<Result<boolean, categoryErrorType>> {
        try {
            await axios.delete(`/api/admin/categories/${categoryId}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async createCategory(
        categoryObj: categoryInputType
    ): Promise<Result<Category, categoryErrorType>> {
        try {
            const category: categoryFromBackEndType = await axios.post(
                `/api/admin/categories`,
                categoryObj
            );

            const categoryEntity = new Category(
                category.data.id,
                category.data.name,
                category.data.slug,
                category.data.products_count
            );
            return new Success(categoryEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async updateCategory(
        categoryObj: categoryInputType,
        categoryId: number
    ): Promise<Result<Category, categoryErrorType>> {
        try {
            const category: categoryFromBackEndType = await axios.patch(
                `/api/admin/categories/${categoryId}`,
                categoryObj
            );

            const categoryEntity = new Category(
                category.data.id,
                category.data.name,
                category.data.slug,
                category.data.products_count
            );
            return new Success(categoryEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
}
