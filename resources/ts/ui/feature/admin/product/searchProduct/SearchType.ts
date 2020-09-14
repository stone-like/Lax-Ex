import { multipleSearchType } from "../../../../../core/dto/product/productDTOType";

export type searchByCategory = {
    method: "Category";
    value: {
        categoryName: string;
        categoryId: number;
    };
    page: number;
};
export type searchByName = {
    method: "Name";
    value: {
        name: string;
    };
    page: number;
};
export type searchByMultiple = {
    method: "Multiple";
    value: { multipleSearch: multipleSearchType; categoryName: string };
    page: number;
};

export type searchInitial = {
    method: "";
    value: string;
};

export type allSearchByType =
    | searchByCategory
    | searchByName
    | searchByMultiple
    | searchInitial;
