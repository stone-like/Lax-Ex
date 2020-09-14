import React, { useState, useEffect, Fragment } from "react";
import { allSearchByType } from "../../admin/product/searchProduct/SearchType";
import { StaticContext, Redirect, RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";
import { productEntityListType } from "../../../../core/repository/product/ProductType";
import { ProductLaravel } from "../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../core/usecase/ProductInteractor";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import { UserProductList } from "./UserProductList";
import { UserSearchBy } from "./UserSearchBy";
import { CustomPagination } from "../../../app/util/pagination/CustomPagination";
import {
    paginateType,
    paginationObjType
} from "../../../../core/dto/pagination/paginateType";
import { Result } from "../../../../util/ErrorObject";
import { productErrorType } from "../../../../core/error/product/productErrorType";
import { CustomLoader } from "../../../app/util/loader/CustomLoader";

type LocationState = allSearchByType;
export const UserSearchProduct = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const searchObj = props.location.state;
    const [productList, setProductList] = useState<productEntityListType>([]);
    const [searchBy, setSearchBy] = useState<allSearchByType>({
        method: "",
        value: ""
    });
    const [pageMetaData, setPageMetaData] = useState<paginateType>();
    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const repository = new ProductLaravel();
    const interactor = new ProductInteractor(repository);

    const SearchFromBackend = async (searchObj: allSearchByType) => {
        switch (searchObj.method) {
            case "Category":
                return await interactor.searchByCategory(
                    searchObj.value.categoryId,
                    searchObj.page
                );
            case "Name":
                return await interactor.searchBySlug(
                    searchObj.value.name,
                    searchObj.page
                );

            case "Multiple":
                return await interactor.searchByMultiple(
                    searchObj.value.multipleSearch,
                    searchObj.page
                );
        }
    };
    const SetParameter = (
        value: paginationObjType<productEntityListType>,
        searchObj: allSearchByType
    ) => {
        setProductList(value.data);
        setPageMetaData(value.paginationMeta);
        setSearchBy(searchObj);
        setIsLoaded(true);
    };
    const SearchProduct = async () => {
        if (searchObj === undefined) {
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
        SetParameter(res.value, searchObj);
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchProduct();
    }, [searchObj]);

    //toDo:productList取得とpage描画までにラグがある時にspinnerを用意
    //re-rendering対応策としてapiで取ってくるたびに、paginationにcurrentPageを取ってくればいい
    return (
        <>
            {isSearchObjLoaded ? (
                <SearchProductContainer>
                    <UserSearchBy searchBy={searchBy} />
                    <UserProductList productList={productList} />
                    <CustomPagination
                        current_page={pageMetaData.current_page}
                        per_page={pageMetaData.per_page}
                        totalEntity={pageMetaData.totalEntity}
                        searchObj={searchObj}
                        goToURL="/products"
                    />
                </SearchProductContainer>
            ) : (
                <CustomLoader />
            )}
        </>
    );
};

const SearchProductContainer = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 0rem 5rem 10rem 5rem;
`;
