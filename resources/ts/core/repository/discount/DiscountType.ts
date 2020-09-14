import { Discount } from "../../entity/Discount";

export type discountType = {
    id: number;
    discountCode: string;
    discountPrice: number;
};
export type discountFromBackEndType = {
    data: discountType;
};
export type discountListFromBackEndType = {
    data: discountEntityListType;
};
export type discountEntityListType = Discount[];
