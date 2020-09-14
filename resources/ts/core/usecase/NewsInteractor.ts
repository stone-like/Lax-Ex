import { NewsRepositoryInterface } from "../repository/news/NewsRepositoryInterface";
import { paginationObjType } from "../dto/pagination/paginateType";
import { newsEntityListType } from "../repository/news/NewsType";
import { Result } from "../../util/ErrorObject";
import { newsErrorType } from "../error/news/newsErrorType";

export class NewsInteractor {
    private newsRepository: NewsRepositoryInterface;

    constructor(newsRepository: NewsRepositoryInterface) {
        this.newsRepository = newsRepository;
    }

    async getTopNews(): Promise<newsEntityListType> {
        const res = await this.newsRepository.getTopNews();
        return res;
    }

    async getAllNews(
        page: number
    ): Promise<Result<paginationObjType<newsEntityListType>, unknown>> {
        const res = await this.newsRepository.getAllNews(page);
        return res;
    }

    async searchByTitle(
        title: string,
        page: number
    ): Promise<Result<paginationObjType<newsEntityListType>, unknown>> {
        const res = await this.newsRepository.searchByTitle(title, page);
        return res;
    }
    async searchByContent(
        content: string,
        page: number
    ): Promise<Result<paginationObjType<newsEntityListType>, unknown>> {
        const res = await this.newsRepository.searchByContent(content, page);
        return res;
    }
    async createNews(
        title: string,
        content: string
    ): Promise<Result<boolean, unknown>> {
        const res = await this.newsRepository.createNews(title, content);
        return res;
    }
    async updateNews(
        id: number,
        title: string,
        content: string
    ): Promise<Result<boolean, newsErrorType>> {
        const res = await this.newsRepository.updateNews(id, title, content);
        return res;
    }
    async deleteNews(id: number): Promise<Result<boolean, newsErrorType>> {
        const res = await this.newsRepository.deleteNews(id);
        return res;
    }
}
