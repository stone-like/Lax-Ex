import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { allSearchByType } from "../../../feature/admin/product/searchProduct/SearchType";
import { useHistory, Redirect } from "react-router-dom";
import { ProductLaravel } from "../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../core/usecase/ProductInteractor";
import { productEntityListType } from "../../../../core/repository/product/ProductType";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Color from "../css/Color";
import { allNewsSearchType } from "../../../feature/admin/news/search/newsSearchType";
type Props = {
    totalEntity: number;
    per_page: number;
    searchObj: allSearchByType | allNewsSearchType;
    current_page: number;
    goToURL: string;
};

type ActiveProps = {
    isActive: boolean;
};
export const CustomPagination = (props: Props) => {
    const { totalEntity, per_page, searchObj, current_page, goToURL } = props;
    const [currentPage, setPage] = useState(current_page);

    const history = useHistory();

    const totalPage = Math.ceil(totalEntity / per_page);

    const historyHandler = (page: number) => {
        // const pathURL =
        //     adminOrUser === "user" ? "/products" : "/admin/searchproduct";
        history.push({
            pathname: goToURL,
            state: {
                method: searchObj.method,
                value: searchObj.value,
                page: page
            }
        });
    };
    const BackHandler = () => {
        if (currentPage === 1) {
            return;
        }

        historyHandler(currentPage - 1);
    };
    const ForwardHandler = () => {
        if (currentPage === totalPage) {
            return;
        }

        historyHandler(currentPage + 1);
    };

    const MoveHandler = (page: number) => {
        historyHandler(page);
    };

    const isActivePage = (page: number) => {
        return page === currentPage;
    };
    const ReturnPaginationLi = (page: number) => {
        return (
            <PaginationLi
                isActive={isActivePage(page)}
                onClick={() => MoveHandler(page)}
            >
                {page}
            </PaginationLi>
        );
    };
    const ReturnAllLi = () => {
        const array = [...Array(totalPage)].map((_, i) => {
            i++;
            return i;
        });
        return array.map(page => {
            return ReturnPaginationLi(page);
        });
    };

    return (
        <PaginationContainer>
            <PaginationContent>
                {totalPage !== 0 && (
                    <>
                        <PaginationSpan onClick={() => BackHandler()}>
                            <IoIosArrowBack />
                        </PaginationSpan>
                        <PaginationUl>{ReturnAllLi()}</PaginationUl>
                        <PaginationSpan onClick={() => ForwardHandler()}>
                            <IoIosArrowForward />
                        </PaginationSpan>
                    </>
                )}
            </PaginationContent>
        </PaginationContainer>
    );
};

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PaginationContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
`;

const PaginationSpan = styled.span`
    margin-right: 2rem;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    color: ${Color.mainBlack};

    &:hover {
        color: ${Color.focusBlack};
    }
`;
const PaginationUl = styled.ul`
    list-style: none;
    display: flex;
    margin-bottom: 0;
`;
const PaginationLi = styled.li`
    color: ${(props: ActiveProps) => {
        return props.isActive ? Color.mainBlack : Color.focusBlack;
    }};
    margin-right: 2rem;
    font-size: 1.5rem;

    font-weight: ${(props: ActiveProps) => {
        return props.isActive ? 900 : 400;
    }};

    cursor: pointer;
`;
