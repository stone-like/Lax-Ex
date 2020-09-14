import { Category } from "../../entity/Category";
export type categoryFromBackEndType = {
    data: {
        id: number;
        name: string;
        slug: string;
        products_count: number;
    };
};
export type categoryType = {
    id: number;
    name: string;
    slug: string;
    products_count: number;
};
export type categoryInputType = {
    name: string;
};
export type categoryListFromBackEndType = {
    data: categoryType[];
};
export type categoryEntityListType = Category[];
