import { categoryState } from "./CategoryType";
import {
    allCategoryActionType,
    categoryListPayloadType,
    deleteCategoryPayloadType,
    addCategoryPayloadType,
    updateCategoryPayloadType
} from "./CategoryAction";

export const initialState: categoryState = {
    categoryList: []
};

const setCategoryList = (
    state: categoryState,
    payload: categoryListPayloadType
): categoryState => {
    return {
        ...state,
        categoryList: payload.categoryList
    };
};
const deleteCategory = (
    state: categoryState,
    payload: deleteCategoryPayloadType
): categoryState => {
    const newList = state.categoryList.filter(category => {
        return category.id !== payload.categoryId;
    });
    return {
        ...state,
        categoryList: newList
    };
};
const addCategory = (
    state: categoryState,
    payload: addCategoryPayloadType
): categoryState => {
    const newList = state.categoryList.concat(payload.category);
    return {
        ...state,
        categoryList: newList
    };
};
const updateCategory = (
    state: categoryState,
    payload: updateCategoryPayloadType
): categoryState => {
    //
    const filteredList = state.categoryList.filter(category => {
        return category.id !== payload.category.id;
    }); //これにupdateしたやつをくっつければいい
    const newList = filteredList.concat(payload.category);
    return {
        ...state,
        categoryList: newList
    };
};
export const CategoryReducer = (
    state: categoryState = initialState,
    action: allCategoryActionType
): categoryState => {
    switch (action.type) {
        case "SETCATEGORYLIST":
            return setCategoryList(state, action.payload);
        case "DELETECATEGORY":
            return deleteCategory(state, action.payload);
        case "ADDCATEGORY":
            return addCategory(state, action.payload);
        case "UPDATECATEGORY":
            return updateCategory(state, action.payload);
        default:
            return state;
    }
};
