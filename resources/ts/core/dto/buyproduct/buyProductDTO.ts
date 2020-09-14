import {
    buyProductEntityListType,
    buyProductType
} from "../../repository/buyproduct/BuyProductType";
import { BuyProduct } from "../../entity/BuyProduct";

export const convertBuyProductListToEntityList = (
    buyProductList: buyProductType[]
): buyProductEntityListType => {
    const buyProductEntityList = buyProductList.map(buyProduct => {
        return new BuyProduct(
            buyProduct.imagePath,
            buyProduct.subtotal,
            buyProduct.name,
            buyProduct.slug,
            buyProduct.buyQuantity,
            buyProduct.price
        );
    });

    return buyProductEntityList;
};
