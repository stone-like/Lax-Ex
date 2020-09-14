import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { useDispatch } from "react-redux";
import { productEntityListType } from "../../../../../core/repository/product/ProductType";
import { useHistory } from "react-router-dom";
import { searchByType } from "../../../product/redux/ProductAction";

export const InputProduct = () => {
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
    const history = useHistory();

    const [input, setInput] = useState("");
    const ChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const SearchProductHandler = async () => {
        history.push({
            pathname: "/admin/searchproduct",
            state: {
                method: "Name",
                value: { name: input }
            }
        });
    };
    //semanticUIのinputはactionがbuttonに入れるpropsで、その他がinputなのに注意
    return (
        <CustomInput
            action={{
                icon: "search",
                onClick: SearchProductHandler
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                ChangeInputHandler(e)
            }
            placeholder="SearchProducts..."
        />
    );
};
const CustomInput = styled(Input)`
    margin-bottom: 3rem;
`;
