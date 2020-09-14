import { cleanup } from "@testing-library/react";
import { CategoryLaravel } from "../core/repository/category/CategoryLaravel";
import { CategoryInteractor } from "../core/usecase/CategoryInteractor";
import {
    CategoryReducer,
    initialState as CategoryInitial
} from "../ui/feature/category/redux/CategoryReducer";
import { Category } from "../core/entity/Category";

afterEach(cleanup);

it("set successfully categoryList on Redux from api", async () => {
    const repository = new CategoryLaravel();
    const interactor = new CategoryInteractor(repository);

    const res = await interactor.getAllCategory();

    const categoryState = CategoryReducer(CategoryInitial, {
        type: "SETCATEGORYLIST",
        payload: {
            categoryList: res
        }
    });

    [
        new Category(1, "test1", "test1", 2),
        new Category(2, "test2", "test2", 3)
    ].forEach((category, index) => {
        expect(category).toEqual(categoryState.categoryList[index]);
    });
});
