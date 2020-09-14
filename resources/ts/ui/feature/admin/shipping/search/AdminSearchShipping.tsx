import React, { useState, useEffect } from "react";
import { StaticContext, Redirect, RouteComponentProps } from "react-router";
import { roleEntityListType } from "../../../../../core/repository/role/RoleType";
import { RoleLaravel } from "../../../../../core/repository/role/RoleLaravel";
import { RoleInteractor } from "../../../../../core/usecase/RoleInteractor";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import {
    shippingSearchType,
    searchShippingObjType
} from "./shippingSearchType";
import { shippingEntityListType } from "../../../../../core/repository/shipping/ShippingType";
import { ShippingLaravel } from "../../../../../core/repository/shipping/ShippingLaravel";
import { ShippingInteractor } from "../../../../../core/usecase/ShippingInteractor";
import { AdminShippingTable } from "./AdminShippingTable";
import { InputShipping } from "./InputShipping";
export const AdminSearchShipping = (
    props: RouteComponentProps<{}, StaticContext, shippingSearchType>
) => {
    const searchObj = props.location.state.searchObj;
    const [shippingList, setShippingList] = useState<shippingEntityListType>();

    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const repository = new ShippingLaravel();
    const interactor = new ShippingInteractor(repository);
    const SearchFromBackend = async (searchObj: searchShippingObjType) => {
        return await interactor.searchByName(searchObj.input);
    };
    const SetAllShipping = async () => {
        const shippingList = await interactor.getAllShipping();
        setShippingList(shippingList.shippingList);
    };

    const SearchShipping = async () => {
        if (searchObj === undefined) {
            return;
        }
        if (searchObj.input === "") {
            await SetAllShipping();

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
        setShippingList(res.value); //useStateがすぐには反映されない問題
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchShipping();
    }, [searchObj]);

    useEffect(() => {
        setIsLoaded(true);
    }, [shippingList]);
    return (
        <SearchShippingContainer>
            <InputShipping />
            {isSearchObjLoaded ? (
                <AdminShippingTable
                    shippingList={shippingList}
                    setShippingList={setShippingList}
                />
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchShippingContainer>
    );
};
const SearchShippingContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
