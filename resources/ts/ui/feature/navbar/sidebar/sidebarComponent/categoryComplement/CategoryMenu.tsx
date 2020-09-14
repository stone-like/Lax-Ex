import React from "react";
import { categoryEntityListType } from "../../../../../../core/repository/category/CategoryType";
import { AnimatedValue, animated } from "react-spring";
import styled from "styled-components";
import Color from "../../../../../app/util/css/Color";
import { Category } from "../../../../../../core/entity/Category";
import { useHistory } from "react-router-dom";
import { useMenuHandler } from "../../../../../../util/hooks/useMenuHandler";

type Props = {
    categoryList: categoryEntityListType;
};
export const CategoryMenu = (props: Props) => {
    const { categoryList } = props;
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
    };
    return (
        <MenuContainer>
            {categoryList.map(category => (
                <EachCategory
                    key={category.id}
                    onClick={() => GoToSearchProductPageHandler(category)}
                >
                    {category.name}
                </EachCategory>
            ))}
        </MenuContainer>
    );
};

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const EachCategory = styled.div`
    margin-bottom: 1.5rem;
    color: ${Color.categoryComplement};

    display: inline-flex;
    position: relative;
    cursor: pointer;

    &::after {
        position: absolute;
        bottom: -4px;
        left: 0;
        content: "";
        width: 100%;
        height: 1px;
        background-color: ${Color.categoryComplement};
        transform: scale(0, 1);
        transform-origin: right top;
        transition: transform 0.4s;
    }
    &:hover::after {
        transform-origin: left top;
        transform: scale(1, 1);
    }
`;
