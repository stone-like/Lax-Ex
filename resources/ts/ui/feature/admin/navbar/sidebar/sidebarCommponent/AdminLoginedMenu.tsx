import React, { forwardRef, Fragment, useState, useEffect } from "react";
import { NavLink as RouterLink, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Color from "../../../../../app/util/css/Color";
import { generateMedia } from "styled-media-query";
import BreakPoint from "../../../../../app/util/css/BreakPoint";
import { isMobile } from "../../../../../app/util/css/IsMoblie";
type pageType = {
    title: string;
    to: string;
    icon: JSX.Element;
};

type AdminLoginedMenuProps = {
    pages: pageType[];
    MenuHandler: (to: string) => void;
    currentActivePage: string;
};

type ActiveProps = {
    isActive: boolean;
};

export const AdminLoginedMenu = (props: AdminLoginedMenuProps) => {
    const { pages, MenuHandler, currentActivePage } = props;
    const isActiveHandler = (currentPage: string, pageMenu: string) => {
        return currentPage === pageMenu;
    };

    return (
        <CustomDiv>
            {pages.map((page: pageType) => (
                <CustomMenu
                    key={page.title}
                    onClick={() => MenuHandler(page.to)}
                    isActive={isActiveHandler(currentActivePage, page.title)}
                >
                    <MenuContainer
                        isActive={isActiveHandler(
                            currentActivePage,
                            page.title
                        )}
                    >
                        <PageIcon>{page.icon}</PageIcon>
                        <PageTitle>{page.title}</PageTitle>
                    </MenuContainer>
                </CustomMenu>
            ))}
        </CustomDiv>
    );
};
const CustomDiv = styled.div`
    width: 100%;
    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 2.5rem 2.5rem 2.5rem 2.5rem;
`;
const CustomMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    width: 100%;
    cursor: pointer;
    color: ${(props: ActiveProps) => {
        return props.isActive ? Color.currentPage : Color.sidebarBlack;
    }};

    &:hover,
    :active,
    :visited,
    :link {
        color: ${(props: ActiveProps) => {
            return props.isActive ? Color.currentPage : Color.sidebarBlack;
        }};
    }
`;
const MenuContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    border-bottom: ${(props: ActiveProps) => {
        return props.isActive ? `1px solid ${Color.currentPage}` : ``;
    }};

    overflow: hidden;
`;
const PageIcon = styled.div`
    font-size: 1.8rem;
`;
const PageTitle = styled.div`
    margin-left: 2rem;
    font-size: 1.8rem;
`;
