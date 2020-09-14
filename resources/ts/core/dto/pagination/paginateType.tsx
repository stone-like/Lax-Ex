import { productEntityListType } from "../../repository/product/ProductType";
import { newsEntityListType } from "../../repository/news/NewsType";

// export type paginationedType = productEntityListType | newsEntityListType;
export type paginateType = {
    per_page: number;
    totalEntity: number;
    current_page: number;
};

export type paginationObjType<T> = {
    data: T;
    paginationMeta: paginateType;
};
