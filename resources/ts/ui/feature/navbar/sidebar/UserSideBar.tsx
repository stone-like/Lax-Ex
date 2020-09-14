import React, { useState } from "react";
import { RootState } from "../../../store/configureStore";
import { useSelector } from "react-redux";
import { useMenuHandler } from "../../../../util/hooks/useMenuHandler";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";
import Zindex from "../../../app/util/css/Zindex";
import { userLogoutPages } from "../pages/userLogoutPages";
import { userLoginPages } from "../pages/userLoginPages";
import { UserLoginedMenu } from "./sidebarComponent/UserLoginedMenu";
import { UserLogoutMenu } from "./sidebarComponent/UserLogoutMenu";
import { SideBarCategoryComplement } from "./sidebarComponent/categoryComplement/SideBarCategoryComplement";

export const UserSideBar = () => {
    const user = useSelector((state: RootState) => {
        return state.user.user;
    });

    const categoryList = useSelector((state: RootState) => {
        return state.category.categoryList;
    });

    const [isCateComplementActive, setIsCateComplementActive] = useState<
        boolean
    >(false);

    const { currentActivePage, MenuHandler } = useMenuHandler(false);
    return (
        <SidebarContainer>
            <SideBarContent>
                <UserSideBarLogo onClick={() => MenuHandler("home")}>
                    Lax
                </UserSideBarLogo>

                {user.isLoggedIn ? (
                    <UserLoginedMenu
                        pages={userLoginPages}
                        currentActivePage={currentActivePage}
                        MenuHandler={MenuHandler}
                        setIsCateComponentActive={setIsCateComplementActive}
                    />
                ) : (
                    <UserLogoutMenu
                        pages={userLogoutPages}
                        currentActivePage={currentActivePage}
                        MenuHandler={MenuHandler}
                        setIsCateComponentActive={setIsCateComplementActive}
                    />
                )}
            </SideBarContent>
            <SideBarCategoryComplement
                isOpen={isCateComplementActive}
                setIsOpen={setIsCateComplementActive}
                categoryList={categoryList}
            />
        </SidebarContainer>
    );
};

const SidebarContainer = styled.div`
    width: 20vw;
    height: 100%;
    background-color: ${Color.sidebar};
    /* display: flex;
    flex-direction: column;
    align-items: center; */

    /* mainContentが多くなっても固定されるように */
    position: fixed;
    border-right: 2px solid ${Color.sidebarBorder};

    z-index: ${Zindex.sidebarComp};

    display: flex;
    flex-direction: row;
`;

const SideBarContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: ${Zindex.sidebarComp};
    background-color: ${Color.mainWhite};
`;

const UserSideBarLogo = styled.div`
    margin-top: 7rem;
    font-size: 3rem;
    font-family: "Cambo";
    font-weight: 700;
    color: ${Color.mainBlack};
    cursor: pointer;
    text-decoration: none;

    &:hover,
    :active,
    :visited,
    :link {
        color: ${Color.mainBlack};
    }
`;
