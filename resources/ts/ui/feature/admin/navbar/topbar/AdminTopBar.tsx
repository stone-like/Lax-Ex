import React, { useState, Fragment } from "react";
import styled from "styled-components";
import Color from "../../../../app/util/css/Color";
import Zindex from "../../../../app/util/css/Zindex";
import { useMenuHandler } from "../../../../../util/hooks/useMenuHandler";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { loginPages } from "../pages/loginpage";
import { logoutPage } from "../pages/logoutpage";
import { AdminProfile } from "../sidebar/sidebarCommponent/AdminProfile";
import { AdminLoginedMenu } from "../sidebar/sidebarCommponent/AdminLoginedMenu";
import { HumburgerMenu } from "../../../navbar/topbar/topbarComponent/HumburgerMenu";
import { HumbugerNavigation } from "../../../navbar/topbar/topbarComponent/HumbugerNavigation";
import { AdminTopLogoutMenu } from "./topbarComponent/AdminTopLogoutMenu";
import { AdminHumbugerNavigation } from "./topbarComponent/AdminHumbugerNavigation";

export const AdminTopBar = () => {
    const admin = useSelector((state: RootState) => {
        return state.admin.admin;
    });
    const [isOpen, setIsOpen] = useState<boolean>();
    const { currentActivePage, MenuHandler } = useMenuHandler(true);

    //loginしていたらハンバーガーメニュー、logoutの時はlogoutMenu
    return (
        <Fragment>
            <AdminTopBarContainer>
                <AdminTopBarLogo onClick={() => MenuHandler("home")}>
                    AdminMode
                </AdminTopBarLogo>

                <HumburgerMenu
                    isMarginAuto={true}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    currentActivePage={currentActivePage}
                    MenuHandler={MenuHandler}
                />
            </AdminTopBarContainer>
            <AdminHumbugerNavigation
                isLoggedIn={admin.isLoggedIn}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                currentActivePage={currentActivePage}
                MenuHandler={MenuHandler}
            />
        </Fragment>
    );
};
const AdminTopBarContainer = styled.div`
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

    margin-right: auto;
    /* padding: 0.5rem 1rem; */
`;

const AdminTopBarLogo = styled.div`
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
`;
