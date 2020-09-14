import React from "react";
import styled from "styled-components";
import Color from "../../../../../app/util/css/Color";

type pageType = {
    title: string;
    to: string;
    icon: JSX.Element;
};

type AdminLogoutMenuProps = {
    page: pageType;
    MenuHandler: (to: string) => void;
    currentActivePage: string;
};

export const AdminTopLogoutMenu = (props: AdminLogoutMenuProps) => {
    const { page, MenuHandler, currentActivePage } = props;
    const isActiveHandler = (currentPage: string, pageMenu: string) => {
        return currentPage === pageMenu;
    };

    return (
        <MenuContainer onClick={() => MenuHandler(page.to)}>
            <PageIcon>{page.icon}</PageIcon>
            <PageTitle>{page.title}</PageTitle>
        </MenuContainer>
    );
};

const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    margin-left: auto;
    padding-right: 2rem;
    color: ${Color.sidebarBlack};
`;
const PageIcon = styled.div`
    font-size: 1.8rem;
`;
const PageTitle = styled.div`
    margin-left: 2rem;
    font-size: 1.8rem;
`;
