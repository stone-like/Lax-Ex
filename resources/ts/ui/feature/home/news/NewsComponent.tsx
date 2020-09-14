import React, { useEffect, useState } from "react";
import { NewsLaravel } from "../../../../core/repository/news/NewsLaravel";
import { NewsInteractor } from "../../../../core/usecase/NewsInteractor";
import { newsEntityListType } from "../../../../core/repository/news/NewsType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";
import { NewsList } from "./NewsList";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";
import { Border } from "../../../app/util/css/Border";
import { BorderButton } from "../../../app/util/css/BorderButton";
import { customMedia } from "../../../app/util/css/Media";
export const NewsComponent = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [newsList, setNewsList] = useState<newsEntityListType>([]);
    const repository = new NewsLaravel();
    const interactor = new NewsInteractor(repository);

    const getTopNewsHandler = async () => {
        const res = await interactor.getTopNews();
        setNewsList(res);
        setIsLoaded(true);
    };
    useEffect(() => {
        setIsLoaded(false);
        getTopNewsHandler();
    }, []);
    return (
        <NewsContainer>
            {!isLoaded ? (
                <span></span>
            ) : (
                <NewsWrapper>
                    <NewsTitle>NEWS</NewsTitle>
                    {/* <Border height={1} color="grey" /> */}
                    <NewsList newsList={newsList} />
                    <ButtonContainer>
                        <BorderButton paddingX={1} paddingY={3} color="gray">
                            Now Constructing
                        </BorderButton>
                    </ButtonContainer>
                </NewsWrapper>
            )}
        </NewsContainer>
    );
};

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 5rem;

    margin-top: 4.5rem;

    ${customMedia.lessThan("breakpoint")`
        justify-content: center;
        padding-right:0;

    `}
`;

const NewsContainer = styled.div`
    width: 100%;
    /* height: 30rem; */
`;
const NewsWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 3rem;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
`;

const NewsTitle = styled.div`
    display: flex;
    justify-content: center;
    font-size: 4rem;
    color: ${Color.mainBlack};
`;
