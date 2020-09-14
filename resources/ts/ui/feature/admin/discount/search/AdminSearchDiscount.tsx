import React, { useState, useEffect } from "react";
import { StaticContext, Redirect, RouteComponentProps } from "react-router";

import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import {
    discountSearchType,
    searchDiscountObjType
} from "./discountSearchType";
import { InputDiscount } from "./InputDiscount";
import { AdminDiscountTable } from "./AdminDiscountTable";
import { discountEntityListType } from "../../../../../core/repository/discount/DiscountType";
import { DiscountLaravel } from "../../../../../core/repository/discount/DiscountLaravel";
import { DiscountInteractor } from "../../../../../core/usecase/DiscountInteractor";

export const AdminSearchDiscount = (
    props: RouteComponentProps<{}, StaticContext, discountSearchType>
) => {
    const searchObj = props.location.state.searchObj;
    const [discountList, setDiscountList] = useState<discountEntityListType>();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const repository = new DiscountLaravel();
    const interactor = new DiscountInteractor(repository);
    const SearchFromBackend = async (searchObj: searchDiscountObjType) => {
        return await interactor.searchByName(searchObj.input);
    };
    const SetAllDiscount = async () => {
        const discountList = await interactor.getAllDiscount();
        setDiscountList(discountList);
    };

    const SearchDiscount = async () => {
        if (searchObj === undefined) {
            return;
        }
        if (searchObj.input === "") {
            await SetAllDiscount();

            return;
        }

        const res = await SearchFromBackend(searchObj);
        if (res.isFailure()) {
            //通常発生しないvalidationErrorが起こった時
            return (
                <Redirect
                    to={{
                        pathname: "/admin/error",
                        state: { error: { errors: res.value } }
                    }}
                />
            );
        }
        setDiscountList(res.value); //useStateがすぐには反映されない問題
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchDiscount();
    }, [searchObj]);

    useEffect(() => {
        setIsLoaded(true);
    }, [discountList]);
    return (
        <SearchDiscountContainer>
            <InputDiscount />
            {isSearchObjLoaded ? (
                <AdminDiscountTable
                    discountList={discountList}
                    setDiscountList={setDiscountList}
                />
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchDiscountContainer>
    );
};
const SearchDiscountContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
