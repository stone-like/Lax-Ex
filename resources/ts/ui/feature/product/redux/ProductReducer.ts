import { productState } from "./ProductType";
import {
    allProductActionType,
    productListPayloadType,
    deleteProductPayloadType,
    addProductPayloadType
} from "./ProductAction";

export const initialState: productState = {
    productList: [],
    searchBy: {
        method: "",
        value: ""
    }
};

const setProductList = (
    state: productState,
    payload: productListPayloadType
): productState => {
    //本当はnestedObjectはDeepCopyしなければいけないんだけど、今回このpayload.productListは新しく生成されたものなのでそのままstateを更新してしまってOK
    return {
        ...state,
        productList: payload.productList,
        searchBy: payload.searchBy
    };
};

const deleteProduct = (
    state: productState,
    payload: deleteProductPayloadType
): productState => {
    const newProductList = state.productList.filter(product => {
        return product.id !== payload.productId;
    });
    return {
        ...state,
        productList: newProductList
    };
};
const addProduct = (
    state: productState,
    payload: addProductPayloadType
): productState => {
    const newProductList = state.productList.concat(payload.product);
    return {
        ...state,
        productList: newProductList
    };
};
export const ProductReducer = (
    state: productState = initialState,
    action: allProductActionType
): productState => {
    switch (action.type) {
        case "SETPRODUCTLIST":
            return setProductList(state, action.payload);
        case "DELETEPRODUCT":
            return deleteProduct(state, action.payload);
        case "ADDPRODUCT":
            return addProduct(state, action.payload);
        default:
            return state;
    }
};
