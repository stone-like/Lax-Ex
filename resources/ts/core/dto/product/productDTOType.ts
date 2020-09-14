import { productEntityListType } from "../../repository/product/ProductType";

export type multipleSearchType = {
    name?: string;
    category?: number;
};

export type multipleSearchInputType = {
    name: string;
    category: number | null;
};

export const MultipleSearchInputTransformation = (
    searchObj: multipleSearchInputType
): multipleSearchType => {
    let searchOption: multipleSearchType = {};
    if (searchObj.name !== "") {
        searchOption["name"] = searchObj.name;
    }
    if (searchObj.category !== null) {
        searchOption["category"] = searchObj.category;
    }

    return searchOption;
};
