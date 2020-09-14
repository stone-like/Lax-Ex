import { News } from "../../entity/News";

export type newsType = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
};
export type newsFromBackEndType = {
    data: newsType;
};
export type newsListFromBackEndType = {
    data: newsType[];
};
export type newsEntityListType = News[];

export type newsListFromResourceWithPaginationType = {
    data: {
        data: newsType[];
        meta: { per_page: number; total: number; current_page: number };
    };
};
