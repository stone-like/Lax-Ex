import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";
import { useMenuHandler } from "../../../../util/hooks/useMenuHandler";
import { HumburgerMenu } from "./topbarComponent/HumburgerMenu";
import { HumbugerNavigation } from "./topbarComponent/HumbugerNavigation";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";
import Zindex from "../../../app/util/css/Zindex";
import { UserTopLogoutMenu } from "./topbarComponent/UserTopLogoutMenu";
import { userLogoutPages } from "../pages/userLogoutPages";
import { userLoginPages } from "../pages/userLoginPages";
import { UserTopBarSearch } from "./topbarComponent/UserTopBarSearch";
import { UserTopBarCart } from "./topbarComponent/UserTopBarCart";
import { UserSearchMode } from "./topbarComponent/UserSearchMode";

export const UserTopBar = () => {
    const user = useSelector((state: RootState) => {
        return state.user.user;
    });
    const cart = useSelector((state: RootState) => {
        return state.cart.cart;
    });
    const [isHumbugerOpen, setIsHumbugerOpen] = useState<boolean>();
    const { currentActivePage, MenuHandler } = useMenuHandler(false);

    const [isSearchMode, setIsSearchMode] = useState<boolean>(false);

    //loginしていたらハンバーガーメニュー、logoutの時はlogoutMenu
    return (
        <Fragment>
            <UserTopBarContainer>
                {isSearchMode ? (
                    <UserSearchMode setIsSearchMode={setIsSearchMode} />
                ) : (
                    <>
                        <UserTopBarLogo onClick={() => MenuHandler("home")}>
                            Lax
                        </UserTopBarLogo>

                        {/* {user.isLoggedIn ? (
                    <HumburgerMenu
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        currentActivePage={currentActivePage}
                        MenuHandler={MenuHandler}
                    />
                ) : (
                    <UserTopLogoutMenu
                        pages={userLogoutPages}
                        currentActivePage={currentActivePage}
                        MenuHandler={MenuHandler}
                    />
                )} */}
                        <UserTopBarSearch setIsSearchMode={setIsSearchMode} />
                        <UserTopBarCart cart={cart} />
                        <HumburgerMenu
                            isMarginAuto={false}
                            isOpen={isHumbugerOpen}
                            setIsOpen={setIsHumbugerOpen}
                            currentActivePage={currentActivePage}
                            MenuHandler={MenuHandler}
                        />
                    </>
                )}
            </UserTopBarContainer>
            <HumbugerNavigation
                isLoggedIn={user.isLoggedIn}
                isOpen={isHumbugerOpen}
                setIsOpen={setIsHumbugerOpen}
                currentActivePage={currentActivePage}
                MenuHandler={MenuHandler}
            />
        </Fragment>
    );
};
const UserTopBarContainer = styled.div`
    width: 100%;
    height: 8vh;
    background-color: ${Color.sidebar};
    display: flex;
    flex-direction: row;
    align-items: center;

    /* mainContentが多くなっても固定されるように */
    position: fixed;
    border-bottom: 1px solid ${Color.sidebarBorder};

    z-index: ${Zindex.topMenu};

    /* padding: 0.5rem 1rem; */
`;

const UserTopBarLogo = styled.div`
    font-size: 2.5rem;
    font-family: "Cambo";
    font-weight: 700;
    color: ${Color.mainBlack};
    cursor: pointer;
    text-decoration: none;

    display: flex;
    align-items: center;
    padding-left: 3rem;
    &:hover,
    :active,
    :visited,
    :link {
        color: ${Color.mainBlack};
    }
    height: 100%;
`;
