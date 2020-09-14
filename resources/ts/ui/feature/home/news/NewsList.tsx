import React from "react";
import { newsEntityListType } from "../../../../core/repository/news/NewsType";
import { EachNews } from "./EachNews";
import styled from "styled-components";

type Props = {
    newsList: newsEntityListType;
};

export const NewsList = (props: Props) => {
    const { newsList } = props;
    return (
        <NewsListContaienr>
            <NewsListWrapper>
                {newsList.map(news => (
                    <EachNews news={news} key={news.id} />
                ))}
            </NewsListWrapper>
        </NewsListContaienr>
    );
};

const NewsListContaienr = styled.div`
    width: 100%;
    margin-top: 3rem;

    display: flex;
    justify-content: center;
`;
const NewsListWrapper = styled.div`
    width: 80%;
`;
