import React from "react";
import { allSearchByType } from "../../admin/product/searchProduct/SearchType";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";
import { MultipleSearchButton } from "../../admin/product/searchProduct/MultipleSearchButton";
import { customMedia } from "../../../app/util/css/Media";

type searchByProps = {
    searchBy: allSearchByType;
};
export const UserSearchBy = (props: searchByProps) => {
    const { searchBy } = props;
    let searchElement;

    const returnSearchElement = () => {
        switch (searchBy.method) {
            case "Category":
                return (searchElement = (
                    <SearchWrapper>
                        <SearchMethod>
                            <SearchSpan>SearchMethod</SearchSpan>
                            <ContentSpan>{searchBy.method}</ContentSpan>
                        </SearchMethod>
                        <SearchValue>
                            <SearchSpan>SearchBy</SearchSpan>
                            <ContentSpan>
                                {searchBy.value.categoryName}
                            </ContentSpan>
                        </SearchValue>
                    </SearchWrapper>
                ));
            case "Name":
                return (searchElement = (
                    <SearchWrapper>
                        <SearchMethod>
                            <SearchSpan>SearchMethod</SearchSpan>
                            <ContentSpan>{searchBy.method}</ContentSpan>
                        </SearchMethod>
                        <SearchValue>
                            <SearchSpan>SearchBy</SearchSpan>
                            <ContentSpan>{searchBy.value.name}</ContentSpan>
                        </SearchValue>
                    </SearchWrapper>
                ));
            case "Multiple":
                const searchByMultiple = searchBy.value.multipleSearch;
                const categoryName = searchBy.value.categoryName;

                type keyType = keyof typeof searchByMultiple;
                return (searchElement = (
                    <AdvancedWrapper>
                        <AdvancedTitle>AdvancedSearch</AdvancedTitle>
                        <AdvancedContent>
                            {Object.keys(searchByMultiple).map(
                                (key: keyType) => {
                                    return (
                                        <AdvancedEachItem key={key}>
                                            <AdvancedSearchSpan>
                                                {key}
                                            </AdvancedSearchSpan>
                                            <AdvancedContentSpan>
                                                {key === "category"
                                                    ? categoryName
                                                    : searchByMultiple[key]}
                                            </AdvancedContentSpan>
                                        </AdvancedEachItem>
                                    );
                                }
                            )}
                        </AdvancedContent>
                    </AdvancedWrapper>
                ));
        }
    };

    return (
        <SearchContainer>
            {returnSearchElement()}
            <MultipleSearchButton
                modalName={"UserProductAdvancedSearchModal"}
            />
        </SearchContainer>
    );
};

const AdvancedTitle = styled.div`
    font-size: 3rem;
    margin-bottom: 2rem;
`;
const AdvancedWrapper = styled.div`
    font-size: 2rem;
    font-weight: 600;
    color: ${Color.mainBlack};

    display: flex;
    flex-direction: column;
`;
const AdvancedContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const AdvancedEachItem = styled.div`
    display: flex;
    margin-right: 2rem;
    font-size: 3rem;
`;

const AdvancedSearchSpan = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: 1.5rem;
`;

const AdvancedContentSpan = styled.span`
    font-size: 3rem;
    font-weight: 600;
`;

const SearchContainer = styled.div`
    display: flex;
    margin: 8rem auto 3.5rem auto;
    width: 70vw;
    padding: 0 3rem;

    ${customMedia.lessThan("breakpoint")`
       flex-direction:column;
    `}
`;
const SearchWrapper = styled.div`
    font-size: 2rem;
    font-weight: 600;
    color: ${Color.mainBlack};

    display: flex;
    justify-content: flex-start;
    align-items: center;

    ${customMedia.lessThan("breakpoint")`
      flex-direction:column;
      align-items:flex-start;
    `}
`;

const SearchMethod = styled.div`
    font-size: 3rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2.5rem;
`;

const SearchValue = styled.div`
    font-size: 3rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;

    ${customMedia.lessThan("breakpoint")`
      margin-top:3rem;
      
    `}
`;

const ContentSpan = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SearchSpan = styled.span`
    margin-right: 1.5rem;
    font-weight: 600;
    font-size: 1.5rem;
`;
