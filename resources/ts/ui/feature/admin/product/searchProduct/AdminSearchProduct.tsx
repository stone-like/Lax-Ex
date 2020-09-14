import React, { useEffect, Fragment, useState } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { Product } from "../../../../../core/entity/Product";
import { AdminProduct } from "./AdminProduct";
import styled from "styled-components";
import { Input, Loader } from "semantic-ui-react";
import { AdminProductTable } from "./AdminProductTable";
import { SearchBy } from "./SearchBy";
import { InputProduct } from "./InputProduct";
import { SearchInputContainer } from "./SearchInputContainer";
import { RouteComponentProps } from "react-router-dom";
import { StaticContext, Redirect } from "react-router";
import { productEntityListType } from "../../../../../core/repository/product/ProductType";
import { searchByType } from "../../../product/redux/ProductAction";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { allSearchByType } from "./SearchType";
import { CustomLoader } from "../../../../app/util/loader/CustomLoader";
import {
    paginateType,
    paginationObjType
} from "../../../../../core/dto/pagination/paginateType";
import { CustomPagination } from "../../../../app/util/pagination/CustomPagination";
import { useAuthError } from "../../../../../util/hooks/useAuthError";

type LocationState = allSearchByType;
export const AdminSearchProduct = (
    props: RouteComponentProps<{}, StaticContext, LocationState>
) => {
    const searchObj = props.location.state;

    const [productList, setProductList] = useState<productEntityListType>([]);
    const [searchBy, setSearchBy] = useState<allSearchByType>({
        method: "",
        value: ""
    });
    const dispatch = useDispatch();
    const [pageMetaData, setPageMetaData] = useState<paginateType>();
    const [isSearchObjLoaded, setIsLoaded] = useState(false);

    const { withAbNormalAuthErrorHandler } = useAuthError("admin");

    const SearchFromBackend = async (searchObj: allSearchByType) => {
        const repository = new ProductLaravel();
        const interactor = new ProductInteractor(repository);
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
    const setParameter = (
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
                // <Redirect
                //     to={{
                //         pathname: "/admin/error",
                //         state: { error: { errors: res.value } }
                //     }}
                // />
                withAbNormalAuthErrorHandler(res.value)
            );
        }
        // setProductList(res.value.data, searchObj);
        // setProductList(res.value);
        // setPageMetaData(res.value.paginationMeta);

        // setIsLoaded(true);
        setParameter(res.value, searchObj);
    };
    useEffect(() => {
        setIsLoaded(false);
        SearchProduct();
    }, [searchObj]);

    //toDo:productList取得とpage描画までにラグがある時にspinnerを用意
    return (
        <SearchProductContainer>
            <SearchInputContainer />
            {isSearchObjLoaded ? (
                <Fragment>
                    <SearchBy searchBy={searchBy} />
                    <AdminProductTable productList={productList} />
                    <CustomPagination
                        current_page={pageMetaData.current_page}
                        per_page={pageMetaData.per_page}
                        totalEntity={pageMetaData.totalEntity}
                        searchObj={searchObj}
                        goToURL="/admin/searchproduct"
                    />
                </Fragment>
            ) : (
                <Loader active inline="centered" size="huge" />
            )}
        </SearchProductContainer>
    );
};

const SearchProductContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10rem 5rem;
`;
