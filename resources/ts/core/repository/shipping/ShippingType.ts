import { Shipping } from "../../entity/Shipping";

export type shippingType = {
    id: number;
    name: string;
    price: number;
};

export type shippingInfoArray = {
    defaultValue: number;
    shippingList: shippingType[];
};

export type shippingFromBackEndType = {
    data: shippingType;
};
export type shippingListFromBackEndType = {
    data: shippingEntityListType;
};

export type shippingInfoArrayFromBackEndType = {
    data: shippingInfoArray;
};

export type shippingListWithDefaultValueType = {
    shippingList: shippingEntityListType;
    defaultValue: number;
};
export type shippingEntityListType = Shipping[];
