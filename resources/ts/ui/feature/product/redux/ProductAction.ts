import { productEntityListType } from "../../../../core/repository/product/ProductType";
import { productState } from "./ProductType";
import { allSearchByType } from "../../admin/product/searchProduct/SearchType";
import { Product } from "../../../../core/entity/Product";

export type searchByType = {
    method: string;
    value:
        | string
        | {
              name: string;
              category: string;
          };
};
export type productListPayloadType = {
    productList: productEntityListType;
    searchBy: allSearchByType;
};
export type deleteProductPayloadType = {
    productId: number;
};
export type addProductPayloadType = {
    product: Product;
};
export type setProductListType = {
    type: "SETPRODUCTLIST";
    payload: productListPayloadType;
};
export type deleteProductType = {
    type: "DELETEPRODUCT";
    payload: deleteProductPayloadType;
};

export type addProductType = {
    type: "ADDPRODUCT";
    payload: addProductPayloadType;
};

export const setProductList = (
    productList: productEntityListType,
    searchBy: allSearchByType
): setProductListType => ({
    type: "SETPRODUCTLIST",
    payload: {
        productList,
        searchBy
    }
});

export const deleteProduct = (productId: number): deleteProductType => ({
    type: "DELETEPRODUCT",
    payload: {
        productId
    }
});

export const addProduct = (product: Product): addProductType => ({
    type: "ADDPRODUCT",
    payload: {
        product
    }
});

export type allProductActionType =
    | setProductListType
    | deleteProductType
    | addProductType;
