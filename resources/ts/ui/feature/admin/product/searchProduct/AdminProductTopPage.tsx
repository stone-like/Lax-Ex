import React from "react";
import { Input, Grid, Card, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { useHistory, Redirect } from "react-router-dom";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { productEntityListType } from "../../../../../core/repository/product/ProductType";
import { InputProduct } from "./InputProduct";
import { searchByType } from "../../../product/redux/ProductAction";
import { SearchInputContainer } from "./SearchInputContainer";

export const AdminProductTopPage = () => {
    //categoryStateからcatgeoryは取ってくればいいかな？
    //categoryはuser,admin共通でどこでも使うので、appかindexで取得してもいいかもしれない
    //categoryで必要な情報は　そのcategoryの総product数、(できればlastUpdated)
    const history = useHistory();
    const categoryList = useSelector((state: RootState) => {
        return state.category.categoryList;
    });

    const dispatch = useDispatch();
    const setProduct = (
        productList: productEntityListType,
        searchBy: searchByType
    ) =>
        dispatch({
            type: "SETPRODUCTLIST",
            payload: {
                productList,
                searchBy
            }
        });
    const goToEachCategoryProductHandler = async (
        categoryId: number,
        categoryName: string
    ) => {
        history.push({
            pathname: "/admin/searchproduct",
            state: {
                method: "Category",
                value: { categoryName: categoryName, categoryId: categoryId }
            }
        });
    };
    return (
        <ProductTopContainer>
            <SearchInputContainer />
            <CustomCardGroup>
                {categoryList.map(category => (
                    <CustomCard key={category.name}>
                        <CustomCardContent
                            onClick={() =>
                                goToEachCategoryProductHandler(
                                    category.id,
                                    category.name
                                )
                            }
                        >
                            <Card.Header>{category.name}</Card.Header>
                        </CustomCardContent>
                        <Card.Content extra>
                            <div data-testid="productCount">
                                <Icon name="shop" />
                                {category.productCount}
                            </div>
                        </Card.Content>
                    </CustomCard>
                ))}
            </CustomCardGroup>
        </ProductTopContainer>
    );
};

const ProductTopContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;

const CustomCardGroup = styled(Card.Group)``;
const CustomCardContent = styled(Card.Content)`
    cursor: pointer;
`;
const CustomCard = styled(Card)`
    margin: 2em 2em;
`;
