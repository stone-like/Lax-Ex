import React from "react";
import { useDispatch } from "react-redux";
import { categoryEntityListType } from "../../core/repository/category/CategoryType";
import { CategoryLaravel } from "../../core/repository/category/CategoryLaravel";
import { CategoryInteractor } from "../../core/usecase/CategoryInteractor";

export const useCategory = () => {
    const dispatch = useDispatch();
    const setCategory = (categoryList: categoryEntityListType) =>
        dispatch({
            type: "SETCATEGORYLIST",
            payload: {
                categoryList
            }
        });

    const getAllCategory = async () => {
        const categoryRepository = new CategoryLaravel();
        const categoryInteractor = new CategoryInteractor(categoryRepository);

        const res = await categoryInteractor.getAllCategory();

        setCategory(res);
    };
    return [, getAllCategory];
};
