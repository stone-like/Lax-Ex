import { ProductRepositoryInterface } from "./ProductRepositoryInterface";
import {
    productEntityListType,
    productInputType,
    productListFromResourceType,
    productFromBackEndType,
    productType,
    productListFromResourceWithPaginationType,
    productFromResourceType
} from "./ProductType";
import { ErrorPageError } from "../../../util/ErrorPageError";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import axios from "axios";
import { Product } from "../../entity/Product";
import { multipleSearchType } from "../../dto/product/productDTOType";
import {
    productErrorType,
    productImageErrorType
} from "../../error/product/productErrorType";
import { imageObjListType } from "../../../ui/feature/admin/product/update/ImageType";
import { categoryEntityListType, categoryType } from "../category/CategoryType";
import { Category } from "../../entity/Category";
import {
    paginateType,
    paginationObjType
} from "../../dto/pagination/paginateType";
import { WithPagination } from "../../dto/pagination/paginateDTO";
import { buyProductListFromBackEndType } from "../buyproduct/BuyProductType";

export class ProductLaravel implements ProductRepositoryInterface {
    async searchByCategory(
        categoryId: number,
        page: number
    ): Promise<
        Result<paginationObjType<productEntityListType>, productErrorType>
    > {
        try {
            const productListWithPagination: productListFromResourceWithPaginationType = await axios.post(
                `/api/products/searchByCategory?page=${page}`,
                { category_id: categoryId }
            );

            //基本フロントでデータ成形しない方がよさそうなので、backで成形してしまう

            const productEntityList = productListWithPagination.data.data.map(
                (product: productType) => {
                    return new Product(
                        product.id,
                        product.name,
                        product.slug,
                        product.category_id,
                        product.quantity,
                        product.price,
                        product.weight,
                        product.status,
                        product.description,
                        product.images
                    );
                }
            );
            const paginateMeta: paginateType = {
                per_page: productListWithPagination.data.meta.per_page,
                totalEntity: productListWithPagination.data.meta.total,
                current_page: productListWithPagination.data.meta.current_page
            };

            return new Success(
                WithPagination<productEntityListType>(
                    productEntityList,
                    paginateMeta
                )
            );
        } catch (error) {
            //ここで想定しているErrorはinvalidCategoryIdなんだけど、もしほかのエラーコード出たらどうする問題はある、なのでerrorの型を縛るか縛らないか・・・
            return new Failure(error.response.data.errors);
        }
    }
    async searchByMultiple(
        searchObj: multipleSearchType,
        page: number
    ): Promise<
        Result<paginationObjType<productEntityListType>, productErrorType>
    > {
        try {
            const productListWithPagination: productListFromResourceWithPaginationType = await axios.post(
                `/api/products/searchByMultiple?page=${page}`,
                searchObj
            );

            const productEntityList = productListWithPagination.data.data.map(
                (product: productType) => {
                    return new Product(
                        product.id,
                        product.name,
                        product.slug,
                        product.category_id,
                        product.quantity,
                        product.price,
                        product.weight,
                        product.status,
                        product.description,
                        product.images
                    );
                }
            );
            const paginateMeta: paginateType = {
                per_page: productListWithPagination.data.meta.per_page,
                totalEntity: productListWithPagination.data.meta.total,
                current_page: productListWithPagination.data.meta.current_page
            };

            return new Success(WithPagination(productEntityList, paginateMeta));
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    //searchBySlugでは異常が出ないとしているので第二引数をunknown
    async searchBySlug(
        slug: string,
        page: number
    ): Promise<Result<paginationObjType<productEntityListType>, unknown>> {
        try {
            const productListWithPagination: productListFromResourceWithPaginationType = await axios.post(
                `/api/products/searchBySlug?page=${page}`,
                {
                    slug
                }
            );

            const productEntityList = productListWithPagination.data.data.map(
                (product: productType) => {
                    return new Product(
                        product.id,
                        product.name,
                        product.slug,
                        product.category_id,
                        product.quantity,
                        product.price,
                        product.weight,
                        product.status,
                        product.description,
                        product.images
                    );
                }
            );
            const paginateMeta: paginateType = {
                per_page: productListWithPagination.data.meta.per_page,
                totalEntity: productListWithPagination.data.meta.total,
                current_page: productListWithPagination.data.meta.current_page
            };

            return new Success(WithPagination(productEntityList, paginateMeta));
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async getProduct(
        productId: number
    ): Promise<Result<Product, productErrorType>> {
        try {
            const product: productFromResourceType = await axios.post(
                `/api/products`,
                { product_id: productId }
            );
            const productEntity = new Product(
                product.data.data.id,
                product.data.data.name,
                product.data.data.slug,
                product.data.data.category_id,
                product.data.data.quantity,
                product.data.data.price,
                product.data.data.weight,
                product.data.data.status,
                product.data.data.description,
                product.data.data.images
            );
            return new Success(productEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async getRelatedProduct(
        categoryId: number,
        productId: number
    ): Promise<Result<productEntityListType, productErrorType>> {
        try {
            const productList: productListFromResourceType = await axios.post(
                `/api/relatedproducts`,
                { category_id: categoryId, product_id: productId }
            );
            const productEntityList = productList.data.data.map(
                (product: productType) => {
                    return new Product(
                        product.id,
                        product.name,
                        product.slug,
                        product.category_id,
                        product.quantity,
                        product.price,
                        product.weight,
                        product.status,
                        product.description,
                        product.images
                    );
                }
            );

            return new Success(productEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async getRecommendedProduct(): Promise<
        Result<productEntityListType, unknown>
    > {
        try {
            const productList: productListFromResourceType = await axios.get(
                `/api/recommendedproducts`
            );
            console.log(productList);
            const productEntityList = productList.data.data.map(
                (product: productType) => {
                    return new Product(
                        product.id,
                        product.name,
                        product.slug,
                        product.category_id,
                        product.quantity,
                        product.price,
                        product.weight,
                        product.status,
                        product.description,
                        product.images
                    );
                }
            );

            return new Success(productEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async updateProduct(
        productObj: productInputType,
        productId: number
    ): Promise<Result<boolean, productErrorType>> {
        try {
            await axios.patch(`/api/admin/products/${productId}`, productObj);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async createProduct(
        productObj: productInputType
    ): Promise<Result<Product, productErrorType>> {
        try {
            const product: productFromBackEndType = await axios.post(
                `/api/admin/products`,
                productObj
            );
            const productEntity = new Product(
                product.data.id,
                product.data.name,
                product.data.slug,
                product.data.category_id,
                product.data.quantity,
                product.data.price,
                product.data.weight,
                product.data.status,
                product.data.description,
                product.data.images
            );
            return new Success(productEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async deleteProduct(
        productId: number
    ): Promise<Result<boolean, productErrorType>> {
        try {
            await axios.delete(`/api/admin/products/${productId}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    //updateの際は何もreturnしないが、validationErrorは起こりえるのでこうしている
    async updateProductImage(
        formData: FormData
    ): Promise<Result<boolean, productImageErrorType>> {
        try {
            await axios.post("/api/admin/updateproductimages", formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async saveProductImage(
        formData: FormData
    ): Promise<Result<boolean, productImageErrorType>> {
        try {
            await axios.post("/api/admin/saveproductimages", formData, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    //この関数の想定としては正常系は何も返さない、異常の時だけresができる
    //このときnullをSuccessにいれてもよいのか、
    //それとも重複気味になってしまうがSuccessにbooleanのtrueを入れておくか（SuccessとFailureでtrue、falseの役割なのでSuccessのなかにtrue入れることに意味がない、falseを入れても成立してしまうので）
    //なぜSuccessを返さなければいけないかというとres.isFailure()のresがundefinedになってしまうから
    //undefiendチェックをreact側で入れるのはこのresult型の利点を消すというか汚くなる気がするので出来ればやりたくない
    async deleteProductImage(
        deleteIds: number[]
    ): Promise<Result<boolean, productImageErrorType>> {
        try {
            await axios.post("/api/admin/deleteproductimages", {
                deleteIds: deleteIds
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
}
