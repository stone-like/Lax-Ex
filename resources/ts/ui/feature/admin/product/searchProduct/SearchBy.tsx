import React from "react";
import { searchByType } from "../../../product/redux/ProductAction";
import { allSearchByType } from "./SearchType";
import styled from "styled-components";
import Color from "../../../../app/util/css/Color";

type searchByProps = {
    searchBy: allSearchByType;
};
export const SearchBy = (props: searchByProps) => {
    const { searchBy } = props;
    let searchElement;
    switch (searchBy.method) {
        case "Category":
            return (searchElement = (
                <SearchContainer>
                    <SearchMethod>{searchBy.method}</SearchMethod>
                    <SearchValue>{searchBy.value.categoryName}</SearchValue>
                </SearchContainer>
            ));
        case "Name":
            return (searchElement = (
                <div>
                    SearchBy: {searchBy.method} value:{searchBy.value.name}
                </div>
            ));
        case "Multiple":
            const searchByMultiple = searchBy.value.multipleSearch;
            const categoryName = searchBy.value.categoryName;

            type keyType = keyof typeof searchByMultiple;
            return (searchElement = (
                <div>
                    AdvancedSearch:
                    {Object.keys(searchByMultiple).map((key: keyType) => {
                        return (
                            <div key={key}>
                                {key}:
                                {key === "category"
                                    ? categoryName
                                    : searchByMultiple[key]}
                            </div>
                        );
                    })}
                </div>
            ));
    }

    return <div>{searchElement}</div>;
};

const SearchContainer = styled.div`
    font-size: 2rem;
    font-weight: 600;
    color: ${Color.mainBlack};
`;

const SearchMethod = styled.div`
    font-size: 2rem;
    font-weight: 600;
`;

const SearchValue = styled.div`
    font-size: 2rem;
    font-weight: 600;
`;
