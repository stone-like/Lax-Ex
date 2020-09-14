import { addressType } from "../address/AddressType";
import { productType } from "../product/ProductType";
import { cartItemType } from "../cart/CartType";
import { buyProductType } from "../buyproduct/BuyProductType";
import { Order } from "../../entity/Order";

export type orderType = {
    id: number;
    subtotal: string;
    discount: string;
    shipping_fee: number;
    tax: string;
    total: string;
    address: addressType;
    buyProductList: buyProductType[];
    created_at: string;
    shipped_at?: string;
    order_status: string;
};
export type orderFromBackEndType = {
    data: orderType;
};
export type orderListFromBackEndType = {
    data: orderType[];
};

export type orderEntityList = Order[];
