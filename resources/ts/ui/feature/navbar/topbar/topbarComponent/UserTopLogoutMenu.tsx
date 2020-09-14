import React from "react";
import styled from "styled-components";
import Color from "../../../../app/util/css/Color";

type pageType = {
    title: string;
    to: string;
    icon: JSX.Element;
};

type UserLogoutMenuProps = {
    pages: pageType[];
    MenuHandler: (to: string) => void;
    currentActivePage: string;
};

export const UserTopLogoutMenu = (props: UserLogoutMenuProps) => {
    const { pages, MenuHandler, currentActivePage } = props;

    //loginOrRegister
    return (
        <LogoutMenuContainer>
            {pages.map(page => (
                <MenuContainer
                    onClick={() => MenuHandler(page.to)}
                    key={page.title}
                >
                    <PageIcon>{page.icon}</PageIcon>
                    <PageTitle>{page.title}</PageTitle>
                </MenuContainer>
            ))}
        </LogoutMenuContainer>
    );
};

const LogoutMenuContainer = styled.div`
    display: flex;
    margin-left: auto;
    padding-right: 2rem;
    color: ${Color.sidebarBlack};
`;

const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 2rem;
`;
const PageIcon = styled.div`
    font-size: 1.8rem;
`;
const PageTitle = styled.div`
    margin-left: 2rem;
    font-size: 1.8rem;
`;
