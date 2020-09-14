import { CategoryRepositoryInterface } from "../repository/category/CategoryRepositoryInterface";
import {
    categoryEntityListType,
    categoryInputType
} from "../repository/category/CategoryType";
import { Result } from "../../util/ErrorObject";
import { categoryErrorType } from "../error/category/categoryErrorType";
import { Category } from "../entity/Category";

export class CategoryInteractor {
    private CategoryRepository: CategoryRepositoryInterface;

    constructor(CategoryRepository: CategoryRepositoryInterface) {
        this.CategoryRepository = CategoryRepository;
    }
    async getAllCategory(): Promise<categoryEntityListType> {
        const res = await this.CategoryRepository.getAllCategory();
        return res;
    }
    async searchBySlug(
        slug: string
    ): Promise<Result<categoryEntityListType, unknown>> {
        const res = await this.CategoryRepository.searchBySlug(slug);
        return res;
    }
    async deleteCategory(
        categoryId: number
    ): Promise<Result<boolean, categoryErrorType>> {
        const res = await this.CategoryRepository.deleteCategory(categoryId);
        return res;
    }
    async createCategory(
        categoryObj: categoryInputType
    ): Promise<Result<Category, categoryErrorType>> {
        const res = await this.CategoryRepository.createCategory(categoryObj);
        return res;
    }
    async updateCategory(
        categoryObj: categoryInputType,
        categoryId: number
    ): Promise<Result<Category, categoryErrorType>> {
        const res = await this.CategoryRepository.updateCategory(
            categoryObj,
            categoryId
        );
        return res;
    }
}
