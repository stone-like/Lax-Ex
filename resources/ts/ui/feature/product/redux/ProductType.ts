import { productEntityListType } from "../../../../core/repository/product/ProductType";
import { allSearchByType } from "../../admin/product/searchProduct/SearchType";

export type productState = {
    productList: productEntityListType;
    searchBy: allSearchByType;
};
