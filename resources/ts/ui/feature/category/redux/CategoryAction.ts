import { categoryEntityListType } from "../../../../core/repository/category/CategoryType";
import { Category } from "../../../../core/entity/Category";

export type categoryListPayloadType = {
    categoryList: categoryEntityListType;
};
export type deleteCategoryPayloadType = {
    categoryId: number;
};
export type addCategoryPayloadType = {
    category: Category;
};
export type updateCategoryPayloadType = {
    category: Category;
};
export type setCategoryListType = {
    type: "SETCATEGORYLIST";
    payload: categoryListPayloadType;
};

export type deleteCategoryType = {
    type: "DELETECATEGORY";
    payload: deleteCategoryPayloadType;
};
export type addCategoryType = {
    type: "ADDCATEGORY";
    payload: addCategoryPayloadType;
};
export type updateCategoryType = {
    type: "UPDATECATEGORY";
    payload: updateCategoryPayloadType;
};

export const setCategoryList = (
    categoryList: categoryEntityListType
): setCategoryListType => ({
    type: "SETCATEGORYLIST",
    payload: {
        categoryList
    }
});
export const deleteCategory = (categoryId: number): deleteCategoryType => ({
    type: "DELETECATEGORY",
    payload: {
        categoryId
    }
});
export const addCategory = (category: Category): addCategoryType => ({
    type: "ADDCATEGORY",
    payload: {
        category
    }
});
export const updateCategory = (category: Category): updateCategoryType => ({
    type: "UPDATECATEGORY",
    payload: {
        category
    }
});

export type allCategoryActionType =
    | setCategoryListType
    | deleteCategoryType
    | addCategoryType
    | updateCategoryType;
