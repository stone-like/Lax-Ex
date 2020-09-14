import { ProductRepositoryInterface } from "../repository/product/ProductRepositoryInterface";
import { Result } from "../../util/ErrorObject";
import {
    productEntityListType,
    productInputType
} from "../repository/product/ProductType";
import { ErrorPageError } from "../../util/ErrorPageError";
import { multipleSearchType } from "../dto/product/productDTOType";
import {
    productErrorType,
    productImageErrorType
} from "../error/product/productErrorType";
import { imageObjListType } from "../../ui/feature/admin/product/update/ImageType";
import { categoryEntityListType } from "../repository/category/CategoryType";
import { Product } from "../entity/Product";
import { paginationObjType } from "../dto/pagination/paginateType";

export class ProductInteractor {
    private ProductRepository: ProductRepositoryInterface;

    constructor(ProductRepository: ProductRepositoryInterface) {
        this.ProductRepository = ProductRepository;
    }
    async searchByCategory(
        categoryId: number,
        page: number
    ): Promise<
        Result<paginationObjType<productEntityListType>, productErrorType>
    > {
        const res = this.ProductRepository.searchByCategory(categoryId, page);
        return res;
    }
    async searchByMultiple(
        searchObj: multipleSearchType,
        page: number
    ): Promise<
        Result<paginationObjType<productEntityListType>, productErrorType>
    > {
        const res = await this.ProductRepository.searchByMultiple(
            searchObj,
            page
        );
        return res;
    }

    //validationErrorはなしなので普通に返す
    async searchBySlug(
        slug: string,
        page: number
    ): Promise<Result<paginationObjType<productEntityListType>, unknown>> {
        const res = await this.ProductRepository.searchBySlug(slug, page);
        return res;
    }
    async getProduct(
        productId: number
    ): Promise<Result<Product, productErrorType>> {
        const res = await this.ProductRepository.getProduct(productId);
        return res;
    }
    async getRelatedProduct(
        categoryId: number,
        productId: number
    ): Promise<Result<productEntityListType, productErrorType>> {
        const res = await this.ProductRepository.getRelatedProduct(
            categoryId,
            productId
        );
        return res;
    }
    async getRecommendedProduct(): Promise<
        Result<productEntityListType, unknown>
    > {
        const res = await this.ProductRepository.getRecommendedProduct();
        return res;
    }
    async deleteProduct(
        productId: number
    ): Promise<Result<boolean, productErrorType>> {
        const res = await this.ProductRepository.deleteProduct(productId);
        return res;
    }
    async createProduct(
        productObj: productInputType
    ): Promise<Result<Product, productErrorType>> {
        const res = await this.ProductRepository.createProduct(productObj);
        return res;
    }
    async updateProduct(
        productObj: productInputType,
        productId: number
    ): Promise<Result<boolean, productErrorType>> {
        const res = await this.ProductRepository.updateProduct(
            productObj,
            productId
        );
        return res;
    }
    async updateProductImage(
        formData: FormData
    ): Promise<Result<boolean, productImageErrorType>> {
        const res = await this.ProductRepository.updateProductImage(formData);
        return res;
    }
    async saveProductImage(
        formData: FormData
    ): Promise<Result<boolean, productImageErrorType>> {
        const res = await this.ProductRepository.saveProductImage(formData);
        return res;
    }
    async deleteProductImage(
        deleteIds: number[]
    ): Promise<Result<boolean, productImageErrorType>> {
        const res = await this.ProductRepository.deleteProductImage(deleteIds);
        return res;
    }
}
