import { Product } from "../../entity/Product";

export type productType = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    quantity: number;
    price: number;
    weight: number;
    status: string;
    category_id: number;
    images?: productImageListType;
};
export type productFromBackEndType = {
    data: productType;
};
export type productFromResourceType = {
    data: {
        data: productType;
    };
};
export type productInputType = {
    name: string;
    description?: string;
    quantity: number;
    price: number;
    weight: number;
    category_id: number;
};
export type productImageType = {
    id: number;
    image: string;
};
export type productImageListType = productImageType[];

export type productListFromResourceType = {
    data: {
        data: productType[];
    };
};
export type productEntityListType = Product[];

export type productListFromResourceWithPaginationType = {
    data: {
        data: productType[];
        meta: { per_page: number; total: number; current_page: number };
    };
};
