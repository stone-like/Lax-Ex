import React from "react";
import { News } from "../../../../core/entity/News";
import styled from "styled-components";
import { customMedia } from "../../../app/util/css/Media";

type Props = {
    news: News;
};
export const EachNews = (props: Props) => {
    const { news } = props;
    return (
        <EachNewsContainer>
            <TimeSpan>{news.created_at}</TimeSpan>
            <TitleSpan>{news.title}</TitleSpan>
        </EachNewsContainer>
    );
};
const EachNewsContainer = styled.div`
    display: flex;
    margin-top: 2.5rem;

    ${customMedia.lessThan("breakpoint")`
      flex-direction:column;
      justify-content:center;
      align-items:center;
    `}
`;
const TimeSpan = styled.div`
    font-size: 2rem;
    font-weight: 900;
`;
const TitleSpan = styled.div`
    margin-left: 5.5rem;
    font-size: 2rem;

    ${customMedia.lessThan("breakpoint")`
      margin-left:0;
      margin-top:2rem;
    `}
`;
