import {
    productType,
    productEntityListType
} from "../../repository/product/ProductType";
import { Product } from "../../entity/Product";

export const convertProductListObjToEntityList = (productList:productType[]):productEntityListType => {
   const productEntityList = productList.map((product) => {
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
   });

   return productEntityList;
}
