import { paginateType, paginationObjType } from "./paginateType";

export const WithPagination = <T>(
    paginationed: T,
    paginationMeta: paginateType
): paginationObjType<T> => {
    return {
        data: paginationed,
        paginationMeta
    };
};
