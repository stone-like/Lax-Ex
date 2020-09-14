import React from "react";
import styled from "styled-components";
import { categoryEntityListType } from "../../../../../core/repository/category/CategoryType";
import Zindex from "../../../../app/util/css/Zindex";
import Color from "../../../../app/util/css/Color";
import { useMenuHandler } from "../../../../../util/hooks/useMenuHandler";
import { Category } from "../../../../../core/entity/Category";
import { useHistory } from "react-router-dom";

type Props = {
    isCategoryMode: boolean;
    setIsCategoryMode: React.Dispatch<React.SetStateAction<boolean>>;
    categoryList: categoryEntityListType;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type OpenProps = {
    isCategoryMode: boolean;
};

export const CategoryListComplement = (props: Props) => {
    const {
        isCategoryMode,
        setIsCategoryMode,
        categoryList,
        setIsOpen
    } = props;
    const history = useHistory();

    const { setActivePageHandler } = useMenuHandler(false);
    const GoToSearchProductPageHandler = (category: Category) => {
        setActivePageHandler("products");
        history.push({
            pathname: "/products",
            state: {
                method: "Category",
                value: { categoryName: category.name, categoryId: category.id },
                page: 1
            }
        });
        setIsOpen(false);
        setIsCategoryMode(false);
    };
    return (
        <CategoryListComplementContainer isCategoryMode={isCategoryMode}>
            <ComplementTop>
                <BackContainer onClick={() => setIsCategoryMode(false)}>
                    <LeftArrow>←</LeftArrow>
                    <BackExplain>Back</BackExplain>
                </BackContainer>
            </ComplementTop>
            <ComplementContent>
                {categoryList.map(category => (
                    <CategoryItem
                        key={category.id}
                        onClick={() => GoToSearchProductPageHandler(category)}
                    >
                        {category.name}
                    </CategoryItem>
                ))}
            </ComplementContent>
        </CategoryListComplementContainer>
    );
};

const CategoryListComplementContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${Color.mainWhite};
    transition: transform 0.4s ease-in-out;
    transform: ${(props: OpenProps) => {
        return props.isCategoryMode ? "translateX(0%)" : "translateX(-100%)";
    }};

    display: flex;
    flex-direction: column;
    z-index: ${Zindex.categoryModalComplement};
`;
const ComplementTop = styled.div`
    height: 10%;
    display: flex;
`;
const BackContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
    margin-left: auto;
    margin-right: 2rem;
    cursor: pointer;
`;
const LeftArrow = styled.div`
    font-size: 2rem;
`;
const BackExplain = styled.div`
    margin-left: 1rem;
    font-size: 2rem;
`;

const ComplementContent = styled.div`
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 2rem;
`;
const CategoryItem = styled.div`
    cursor: pointer;
    display: block;
    align-items: flex-start;
    padding: 0.5rem 0 0.5rem 5rem;
`;
