export type searchByTitle = {
    method: "Title";
    value: {
        title: string;
    };
    page: number;
};
export type searchByContent = {
    method: "Content";
    value: {
        content: string;
    };
    page: number;
};
export type searchGetAll = {
    method: "All";
    value: {};
    page: number;
};
export type allNewsSearchType = searchByTitle | searchByContent | searchGetAll;
