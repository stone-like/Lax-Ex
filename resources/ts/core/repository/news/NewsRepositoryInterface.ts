import { paginationObjType } from "../../dto/pagination/paginateType";
import { newsEntityListType } from "./NewsType";
import { Result } from "../../../util/ErrorObject";
import { newsErrorType } from "../../error/news/newsErrorType";

export interface NewsRepositoryInterface {
    getTopNews(): Promise<newsEntityListType>;
    getAllNews(
        page: number
    ): Promise<Result<paginationObjType<newsEntityListType>, unknown>>;
    searchByTitle(
        title: string,
        page: number
    ): Promise<Result<paginationObjType<newsEntityListType>, unknown>>;
    searchByContent(
        content: string,
        page: number
    ): Promise<Result<paginationObjType<newsEntityListType>, unknown>>;
    createNews(
        title: string,
        content: string
    ): Promise<Result<boolean, unknown>>;
    updateNews(
        id: number,
        title: string,
        content: string
    ): Promise<Result<boolean, newsErrorType>>;
    deleteNews(id: number): Promise<Result<boolean, newsErrorType>>;
}
