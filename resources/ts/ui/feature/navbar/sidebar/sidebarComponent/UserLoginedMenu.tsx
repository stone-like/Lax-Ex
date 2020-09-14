import React from "react";
import styled from "styled-components";
import Color from "../../../../app/util/css/Color";

type pageType = {
    title: string;
    to: string;
    icon: JSX.Element;
};

type userLoginedMenuProps = {
    pages: pageType[];
    MenuHandler: (to: string) => void;
    currentActivePage: string;
    setIsCateComponentActive: React.Dispatch<React.SetStateAction<boolean>>;
};

type ActiveProps = {
    isActive: boolean;
};

export const UserLoginedMenu = (props: userLoginedMenuProps) => {
    const {
        pages,
        MenuHandler,
        currentActivePage,
        setIsCateComponentActive
    } = props;
    const isActiveHandler = (currentPage: string, pageMenu: string) => {
        return currentPage === pageMenu;
    };
    const SetComplementHandler = (
        hoverPageTitle: string,
        pathName: string,
        setHandler: React.Dispatch<React.SetStateAction<boolean>>,
        boolean: boolean
    ) => {
        if (hoverPageTitle === pathName) {
            setHandler(boolean);
        }
    };
    return (
        <CustomDiv>
            {pages.map((page: pageType) => (
                <CustomMenu
                    key={page.title}
                    onClick={() => MenuHandler(page.to)}
                    isActive={isActiveHandler(currentActivePage, page.title)}
                    onMouseEnter={() =>
                        SetComplementHandler(
                            page.title,
                            "category",
                            setIsCateComponentActive,
                            true
                        )
                    }
                    onMouseLeave={() =>
                        SetComplementHandler(
                            page.title,
                            "category",
                            setIsCateComponentActive,
                            false
                        )
                    }
                >
                    <ContainerPadding>
                        <Content
                            isActive={isActiveHandler(
                                currentActivePage,
                                page.title
                            )}
                        >
                            <PageIcon>{page.icon}</PageIcon>
                            <PageTitle>{page.title}</PageTitle>
                        </Content>
                    </ContainerPadding>
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
    padding: 2.5rem 0;
`;
const CustomMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    height: 10%;
    width: 100%;
    /* padding: 0.5rem 5.5rem; */
    cursor: pointer;
    color: ${(props: ActiveProps) => {
        return props.isActive ? Color.currentPage : Color.sidebarBlack;
    }};

    &:active,
    :visited,
    :link {
        color: ${Color.sidebarBlack};
    }

    &:hover {
        color: ${Color.currentPage};
    }
`;
const ContainerPadding = styled.div`
    width: 100%;
    height: 100%;

    padding: 0.5rem 5.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    /* width: 100%; */
    height: 100%;
    position: relative;
    cursor: pointer;

    &::after {
        position: absolute;
        bottom: -4px;
        left: 0;
        content: "";
        width: 100%;
        height: 1px;
        background-color: ${Color.currentPage};
        /* transform: scale(0, 1); */
        transform-origin: right top;
        transition: transform 0.4s;

        transform: ${(props: ActiveProps) => {
            return props.isActive ? "scale(1, 1)" : "scale(0, 1)";
        }};
    }
    &:hover::after {
        transform-origin: left top;
        transform: scale(1, 1);
    }
`;
const PageIcon = styled.div`
    font-size: 1.8rem;
`;
const PageTitle = styled.div`
    margin-left: 2rem;
    font-size: 1.8rem;
`;
