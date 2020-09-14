import React, { useRef, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { categoryEntityListType } from "../../../core/repository/category/CategoryType";
import { DropdownItemProps, Input } from "semantic-ui-react";
import {
    multipleSearchType,
    MultipleSearchInputTransformation
} from "../../../core/dto/product/productDTOType";
import { useHistory } from "react-router-dom";
import Color from "../../app/util/css/Color";
import { BorderButton } from "../../app/util/css/BorderButton";
import WithMediaComponent from "../../app/util/css/WithMediaComponent";
import { customMedia } from "../../app/util/css/Media";

type userProductModalRight = {
    ChangeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    CloseModalHandler: () => void;
    inputValue: string;
};
export const UserProductModalRight = (props: userProductModalRight) => {
    const { ChangeInputHandler, CloseModalHandler, inputValue } = props;
    const categoryList = useSelector((state: RootState) => {
        return state.category.categoryList;
    });
    const history = useHistory();

    const processCategoryList = (
        categoryList: categoryEntityListType
    ): DropdownItemProps[] => {
        return categoryList.map(category => {
            return { label: category.name, value: category.id };
        });
    };
    const categoryNameRef = useRef(null);
    const searchInputTransformer = (): [multipleSearchType, string | null] => {
        const categoryId = categoryNameRef.current.state.value
            ? categoryNameRef.current.state.value.value
            : null;
        const categoryName = categoryNameRef.current.state.value
            ? categoryNameRef.current.state.value.label
            : null;
        return [
            MultipleSearchInputTransformation({
                name: inputValue,
                category: categoryId
            }),
            categoryName
        ];
    };
    //advancedSearchの挙動は複雑なので絶対testを書こう
    const AdvancedSearchHandler = async () => {
        const [filteredSearchObj, categoryName] = searchInputTransformer();

        CloseModalHandler();
        history.push({
            pathname: "/products",
            state: {
                method: "Multiple",
                value: {
                    multipleSearch: filteredSearchObj,
                    categoryName: categoryName
                },
                page: 1
            }
        });
    };

    return (
        <RightContainer>
            <LogoAndCloseContainer>
                <RightLogo>Lax</RightLogo>
                <CloseButton onClick={() => CloseModalHandler()}>×</CloseButton>
            </LogoAndCloseContainer>

            <ProductNameContainer>
                <div>ProductName:</div>
                <CustomInput
                    placeholder="inputProductName"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        ChangeInputHandler(e)
                    }
                />
            </ProductNameContainer>

            <CategoryNameContainer>
                <div>Category:</div>
                <SelectContainer>
                    <Select
                        ref={categoryNameRef}
                        options={processCategoryList(categoryList)}
                    />
                </SelectContainer>
            </CategoryNameContainer>

            <BorderButton
                paddingX={1}
                paddingY={3}
                color="grey"
                onClick={AdvancedSearchHandler}
                style={{ margin: "auto 3rem 1rem auto" }}
                role="advancedSearchButton"
            >
                Search
            </BorderButton>
        </RightContainer>
    );
};

const RightContainer = styled.div`
    width: 100%;
    height: 100%;

    padding: 5rem 2rem;

    display: flex;
    flex-direction: column;
`;
const RightLogo = styled.div`
    font-size: 4.5rem;
    color: ${Color.mainBlack};
    /* margin-bottom: 15rem; */

    margin-left: 1rem;
`;
const CloseButton = styled.div`
    ${customMedia.greaterThan("breakpoint")`
      display:none;
    `}
    font-size:5rem;
    margin-left: auto;
    cursor: pointer;
    margin-right: 2rem;
`;

const LogoAndCloseContainer = styled.div`
    margin-bottom: 15rem;
    display: flex;
`;

const ProductNameContainer = styled.div`
    display: flex;
    margin-bottom: 4rem;
    font-size: 2rem;
    align-items: center;
    padding: 0.5rem 1rem;

    ${customMedia.lessThan("breakpoint")`
       flex-direction:column;
       align-items:flex-start;
    `}

    div {
        ${customMedia.lessThan("breakpoint")`
         margin-bottom:2rem;
    `}
    }
`;

const CategoryNameContainer = styled.div`
    display: flex;
    margin-bottom: 4rem;
    margin-top: 3rem;

    font-size: 2rem;
    align-items: center;
    padding: 0.5rem 1rem;
`;

const CustomInput = styled(Input)``;

const SelectContainer = styled.div`
    flex: 1;
`;
