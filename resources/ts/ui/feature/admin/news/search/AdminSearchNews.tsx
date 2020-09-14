import React, { useState, useEffect } from "react";

import { StaticContext, Redirect, RouteComponentProps } from "react-router";
import { newsEntityListType } from "../../../../../core/repository/news/NewsType";
import { NewsLaravel } from "../../../../../core/repository/news/NewsLaravel";
import { NewsInteractor } from "../../../../../core/usecase/NewsInteractor";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import { InputNews } from "./InputNews";
import { AdminNewsTable } from "./AdminNewsTable";
import {
    paginationObjType,
    paginateType
} from "../../../../../core/dto/pagination/paginateType";
import { useAuthError } from "../../../../../util/hooks/useAuthError";
import { allNewsSearchType } from "./newsSearchType";
import { CustomPagination } from "../../../../app/util/pagination/CustomPagination";

export const AdminSearchNews = (
    props: RouteComponentProps<{}, StaticContext, allNewsSearchType>
) => {
    const searchObj = props.location.state;
    const [newsList, setNewsList] = useState<newsEntityListType>();
    const [pageMetaData, setPageMetaData] = useState<paginateType>();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");

    const repository = new NewsLaravel();
    const interactor = new NewsInteractor(repository);
    const SearchFromBackend = async (searchObj: allNewsSearchType) => {
        switch (searchObj.method) {
            case "Title":
                return await interactor.searchByTitle(
                    searchObj.value.title,
                    searchObj.page
                );
            case "Content":
                return await interactor.searchByContent(
                    searchObj.value.content,
                    searchObj.page
                );
            case "All":
                return await interactor.getAllNews(searchObj.page);
        }
    };

    const setParameter = (value: paginationObjType<newsEntityListType>) => {
        setNewsList(value.data);
        setPageMetaData(value.paginationMeta);
        setIsLoaded(true);
    };

    const SearchNews = async () => {
        if (searchObj === undefined) {
            return;
        }
        const res = await SearchFromBackend(searchObj);

        if (res.isFailure()) {
            //通常発生しないvalidationErrorが起こった時
            return (
                // <Redirect
                //     to={{
                //         pathname: "/admin/error",
                //         state: { error: { errors: res.value } }
                //     }}
                // />
                withAbNormalAuthErrorHandler(res.value)
            );
        }
        setParameter(res.value);
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchNews();
    }, [searchObj]);

    return (
        <SearchNewsContainer>
            <InputNews />
            {isSearchObjLoaded ? (
                <>
                    <AdminNewsTable
                        newsList={newsList}
                        setNewsList={setNewsList}
                    />
                    <CustomPagination
                        current_page={pageMetaData.current_page}
                        per_page={pageMetaData.per_page}
                        totalEntity={pageMetaData.totalEntity}
                        searchObj={searchObj}
                        goToURL="/admin/searchnews"
                    />
                </>
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchNewsContainer>
    );
};
const SearchNewsContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
