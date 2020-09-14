import { NewsRepositoryInterface } from "./NewsRepositoryInterface";
import axios from "axios";
import {
    paginationObjType,
    paginateType
} from "../../dto/pagination/paginateType";
import {
    newsListFromResourceWithPaginationType,
    newsType,
    newsEntityListType,
    newsListFromBackEndType
} from "./NewsType";
import { News } from "../../entity/News";
import { WithPagination } from "../../dto/pagination/paginateDTO";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { newsErrorType } from "../../error/news/newsErrorType";

export class NewsLaravel implements NewsRepositoryInterface {
    async getTopNews(): Promise<newsEntityListType> {
        const newsList: newsListFromBackEndType = await axios.get(
            `/api/topnews`
        );
        const newsEntityList = newsList.data.map((news: newsType) => {
            return new News(
                news.id,
                news.title,
                news.content,
                news.created_at,
                news.updated_at
            );
        });

        return newsEntityList;
    }

    async getAllNews(
        page: number
    ): Promise<Result<paginationObjType<newsEntityListType>, unknown>> {
        try {
            const newsListWithPagination: newsListFromResourceWithPaginationType = await axios.get(
                `/api/admin/news?page=${page}`
            );
            const newsEntityList = newsListWithPagination.data.data.map(
                (news: newsType) => {
                    return new News(
                        news.id,
                        news.title,
                        news.content,
                        news.created_at,
                        news.updated_at
                    );
                }
            );
            const paginateMeta: paginateType = {
                per_page: newsListWithPagination.data.meta.per_page,
                totalEntity: newsListWithPagination.data.meta.total,
                current_page: newsListWithPagination.data.meta.current_page
            };

            return new Success(
                WithPagination<newsEntityListType>(newsEntityList, paginateMeta)
            );
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async searchByTitle(
        title: string,
        page: number
    ): Promise<Result<paginationObjType<newsEntityListType>, unknown>> {
        try {
            const newsListWithPagination: newsListFromResourceWithPaginationType = await axios.post(
                `/api/admin/news/searchByTitle?page=${page}`,
                { title }
            );
            const newsEntityList = newsListWithPagination.data.data.map(
                (news: newsType) => {
                    return new News(
                        news.id,
                        news.title,
                        news.content,
                        news.created_at,
                        news.updated_at
                    );
                }
            );
            const paginateMeta: paginateType = {
                per_page: newsListWithPagination.data.meta.per_page,
                totalEntity: newsListWithPagination.data.meta.total,
                current_page: newsListWithPagination.data.meta.current_page
            };

            return new Success(
                WithPagination<newsEntityListType>(newsEntityList, paginateMeta)
            );
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async searchByContent(
        content: string,
        page: number
    ): Promise<Result<paginationObjType<newsEntityListType>, unknown>> {
        try {
            const newsListWithPagination: newsListFromResourceWithPaginationType = await axios.post(
                `/api/admin/news/searchByContent?page=${page}`,
                { content }
            );
            const newsEntityList = newsListWithPagination.data.data.map(
                (news: newsType) => {
                    return new News(
                        news.id,
                        news.title,
                        news.content,
                        news.created_at,
                        news.updated_at
                    );
                }
            );
            const paginateMeta: paginateType = {
                per_page: newsListWithPagination.data.meta.per_page,
                totalEntity: newsListWithPagination.data.meta.total,
                current_page: newsListWithPagination.data.meta.current_page
            };

            return new Success(
                WithPagination<newsEntityListType>(newsEntityList, paginateMeta)
            );
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async createNews(
        title: string,
        content: string
    ): Promise<Result<boolean, unknown>> {
        try {
            await axios.post("/api/admin/news", {
                title,
                content
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async updateNews(
        id: number,
        title: string,
        content: string
    ): Promise<Result<boolean, newsErrorType>> {
        try {
            await axios.patch(`/api/admin/news/${id}`, {
                title,
                content
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async deleteNews(id: number): Promise<Result<boolean, newsErrorType>> {
        try {
            await axios.delete(`/api/admin/news/${id}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
}
