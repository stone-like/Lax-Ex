import { productEntityListType, productInputType } from "./ProductType";
import { Result } from "../../../util/ErrorObject";
import { ErrorPageError } from "../../../util/ErrorPageError";
import { multipleSearchType } from "../../dto/product/productDTOType";
import {
    productErrorType,
    productImageErrorType
} from "../../error/product/productErrorType";
import { imageObjListType } from "../../../ui/feature/admin/product/update/ImageType";
import { categoryEntityListType } from "../category/CategoryType";
import { Product } from "../../entity/Product";
import { paginationObjType } from "../../dto/pagination/paginateType";

export interface ProductRepositoryInterface {
    searchByCategory: (
        categoryId: number,
        page: number
    ) => Promise<
        Result<paginationObjType<productEntityListType>, productErrorType>
    >;
    searchBySlug: (
        slug: string,
        page: number
    ) => Promise<Result<paginationObjType<productEntityListType>, unknown>>;
    searchByMultiple(
        searchObj: multipleSearchType,
        page: number
    ): Promise<
        Result<paginationObjType<productEntityListType>, productErrorType>
    >;
    getProduct(productId: number): Promise<Result<Product, productErrorType>>;
    getRelatedProduct(
        categoryId: number,
        productId: number
    ): Promise<Result<productEntityListType, productErrorType>>;
    getRecommendedProduct(): Promise<Result<productEntityListType, unknown>>;
    updateProductImage(
        formData: FormData
    ): Promise<Result<boolean, productImageErrorType>>;
    saveProductImage(
        formData: FormData
    ): Promise<Result<boolean, productImageErrorType>>;
    deleteProductImage(
        deleteIds: number[]
    ): Promise<Result<boolean, productImageErrorType>>;
    updateProduct(
        productObj: productInputType,
        productId: number
    ): Promise<Result<boolean, productErrorType>>;
    createProduct(
        productObj: productInputType
    ): Promise<Result<Product, productErrorType>>;
    deleteProduct(
        productId: number
    ): Promise<Result<boolean, productErrorType>>;
}
