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

type ActiveProps = {
    isActive: boolean;
};
export const AdminLogoutMenu = (props: AdminLogoutMenuProps) => {
    const { page, MenuHandler, currentActivePage } = props;
    const isActiveHandler = (currentPage: string, pageMenu: string) => {
        return currentPage === pageMenu;
    };

    return (
        <CustomDiv>
            <CustomMenu
                key={page.title}
                onClick={() => MenuHandler(page.to)}
                isActive={isActiveHandler(currentActivePage, page.title)}
            >
                <MenuContainer
                    isActive={isActiveHandler(currentActivePage, page.title)}
                >
                    <PageIcon>{page.icon}</PageIcon>
                    <PageTitle>{page.title}</PageTitle>
                </MenuContainer>
            </CustomMenu>
        </CustomDiv>
    );
};
const CustomDiv = styled.div`
    width: 100%;
    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2.5rem 2.5rem 2.5rem 2.5rem;
`;

const CustomMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    width: 100%;
    padding: 0.5rem 5.5rem;
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
    justify-content: center;
    align-items: center;
    border-bottom: ${(props: ActiveProps) => {
        return props.isActive ? `1px solid ${Color.currentPage}` : ``;
    }};
`;
const PageIcon = styled.div`
    font-size: 1.8rem;
`;
const PageTitle = styled.div`
    margin-left: 2rem;
    font-size: 1.8rem;
`;
