import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    ModalDrop,
    ModalContainer,
    ModalWrapper,
    ModalDivider,
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions
} from "../../app/util/css/Modal";
import { BorderButton } from "../../app/util/css/BorderButton";
import { Input, DropdownItemProps } from "semantic-ui-react";
import { RootState } from "../../store/configureStore";
import { categoryEntityListType } from "../../../core/repository/category/CategoryType";
import styled from "styled-components";
import Select from "react-select";
import { ProductLaravel } from "../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../core/usecase/ProductInteractor";
import { searchByType } from "../product/redux/ProductAction";
import { productEntityListType } from "../../../core/repository/product/ProductType";
import { Redirect, useHistory } from "react-router-dom";
import {
    MultipleSearchInputTransformation,
    multipleSearchType
} from "../../../core/dto/product/productDTOType";
import { customMedia } from "../../app/util/css/Media";

export const ProductAdvancedSearchModal = () => {
    const [inputValue, setInput] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const categoryList = useSelector((state: RootState) => {
        return state.category.categoryList;
    });
    const CloseModal = () =>
        dispatch({
            type: "CLOSEMODAL"
        });
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

    //値を成形する系統の関数はutilに押し込んでももしかしたらいいのかも
    const processCategoryList = (
        categoryList: categoryEntityListType
    ): DropdownItemProps[] => {
        return categoryList.map(category => {
            return { label: category.name, value: category.id };
        });
    };
    const OuterContentClose = (event: React.MouseEvent<HTMLDivElement>) => {
        const input = event.target as HTMLDivElement;
        if (input.id === "modal-drop" || input.id === "modal-container") {
            CloseModal();
        }
        //外側以外クリックしてもModalが閉じないようにしている
    };

    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
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

        CloseModal();
        history.push({
            pathname: "/admin/searchproduct",
            state: {
                method: "Multiple",
                value: {
                    multipleSearch: filteredSearchObj,
                    categoryName: categoryName
                }
            }
        });
    };
    return (
        <ModalDrop onClick={OuterContentClose} id="modal-drop">
            <ModalContainer id="modal-container">
                {/* ここからクリックしてもmodalが閉じないようにする */}
                <ModalWrapper>
                    <ModalHeader>Advanced Search</ModalHeader>
                    <ModalDivider />
                    <ModalContent>
                        <ProductNameContainer>
                            <div>ProductName:</div>
                            <CustomInput
                                placeholder="inputProductName"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => ChangeInputHandler(e)}
                            />
                        </ProductNameContainer>
                        <ModalDivider />

                        <CategoryNameContainer>
                            <div>Category:</div>
                            <SelectContainer>
                                <Select
                                    ref={categoryNameRef}
                                    options={processCategoryList(categoryList)}
                                />
                            </SelectContainer>
                        </CategoryNameContainer>
                    </ModalContent>
                    <ModalActions>
                        <BorderButton
                            paddingX={1}
                            paddingY={3}
                            color="grey"
                            onClick={AdvancedSearchHandler}
                            style={{ margin: "1rem 3rem 1rem auto" }}
                            role="advancedSearchButton"
                        >
                            Search
                        </BorderButton>
                    </ModalActions>
                </ModalWrapper>
            </ModalContainer>
        </ModalDrop>
    );
};

const ProductNameContainer = styled.div`
    display: flex;
    margin-bottom: 3rem;
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
    margin-bottom: 3rem;
    margin-top: 3rem;

    font-size: 2rem;
    align-items: center;
    padding: 0.5rem 1rem;
`;

const CustomInput = styled(Input)`
    margin-left: 1.3rem;
`;

const SelectContainer = styled.div`
    flex: 1;
`;
