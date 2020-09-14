import { cleanup } from "@testing-library/react";
import { MultipleSearchInputTransformation } from "../core/dto/product/productDTOType";
afterEach(cleanup);

it("empty name is filtered when name is empty", () => {
    const searchInputObj = {
        name: "",
        category: "Test"
    };
    const filtered = MultipleSearchInputTransformation(searchInputObj);

    expect(filtered).toEqual({
        category: "Test"
    });
});

it("null category is filtered when category is null", () => {
    const searchInputObj = {
        name: "test",
        category: null
    };
    const filtered = MultipleSearchInputTransformation(searchInputObj);

    expect(filtered).toEqual({
        name: "test"
    });
});
