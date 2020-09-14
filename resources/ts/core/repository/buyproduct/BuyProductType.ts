import { BuyProduct } from "../../entity/BuyProduct";

export type buyProductType = {
    id: number;
    name: string;
    slug: string;
    buyQuantity: string;
    price: string;
    subtotal: string;
    imagePath: string;
};
export type buyProductListFromBackEndType = {
    data: buyProductType[];
};
export type buyProductEntityListType = BuyProduct[];
