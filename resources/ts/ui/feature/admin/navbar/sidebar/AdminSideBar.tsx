import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { AdminProfile } from "./sidebarCommponent/AdminProfile";
import { FaShoppingCart } from "react-icons/fa";
import {
    BsPeopleCircle,
    BsReverseLayoutTextSidebarReverse
} from "react-icons/bs";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { GrStatusCriticalSmall } from "react-icons/gr";
import {
    AiOutlineSend,
    AiOutlineBuild,
    AiFillStar,
    AiOutlineCloud,
    AiOutlineMoneyCollect,
    AiOutlineHistory
} from "react-icons/ai";
import { GiNewspaper } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import Zindex from "../../../../app/util/css/Zindex";
import styled from "styled-components";
import Color from "../../../../app/util/css/Color";
import { AdminLogoutMenu } from "./sidebarCommponent/AdminLogoutMenu";
import { AdminLoginedMenu } from "./sidebarCommponent/AdminLoginedMenu";
import { useMenuHandler } from "../../../../../util/hooks/useMenuHandler";

export const AdminSideBar = () => {
    const admin = useSelector((state: RootState) => {
        return state.admin.admin;
    });

    // const [currentActivePage, setActivePage] = useState("home");
    const history = useHistory();

    const {
        MenuHandler,
        currentActivePage,
        setActivePageHandler
    } = useMenuHandler(true);

    // const MenuHandler = (to: string) => {
    //     setActivePage(to);
    //     if (
    //         to === "register" ||
    //         to === "login" ||
    //         to === "logout" ||
    //         to === "order"
    //     ) {
    //         return history.push(`/admin/${to}`);
    //     }

    //     if (to === "news") {
    //         return history.push({
    //             pathname: `/admin/${to}`,
    //             state: {
    //                 method: "All"
    //             }
    //         });
    //     }

    //     return history.push({
    //         pathname: `/admin/${to}`,
    //         state: {
    //             searchObj: {
    //                 input: ""
    //             }
    //         }
    //     });
    // };

    const loginPages = [
        {
            title: "users",
            to: "users",
            icon: <BsPeopleCircle />
        },
        {
            title: "products",
            to: "products",
            icon: <FaShoppingCart />
        },
        {
            title: "register",
            to: "register",
            icon: <MdAssignmentTurnedIn />
        },
        {
            title: "category",
            to: "category",
            icon: <BsReverseLayoutTextSidebarReverse />
        },
        {
            title: "roles",
            to: "roles",
            icon: <AiOutlineSend />
        },
        {
            title: "roleToAdmin",
            to: "roleToAdmin",
            icon: <AiFillStar />
        },
        {
            title: "permissions",
            to: "permissions",
            icon: <AiOutlineBuild />
        },
        {
            title: "permissionToRole",
            to: "permissionToRole",
            icon: <AiOutlineCloud />
        },
        {
            title: "discount",
            to: "discount",
            icon: <AiOutlineMoneyCollect />
        },
        {
            title: "shipping",
            to: "shipping",
            icon: <MdLocalShipping />
        },
        {
            title: "order",
            to: "order",
            icon: <AiOutlineHistory />
        },
        {
            title: "orderStatus",
            to: "orderStatus",
            icon: <GrStatusCriticalSmall />
        },
        {
            title: "news",
            to: "news",
            icon: <GiNewspaper />
        },
        {
            title: "logout",
            to: "logout",
            icon: <FiLogOut />
        }
    ];

    const logoutPage = {
        title: "login",
        to: "login",
        icon: <FiLogIn />
    };
    return (
        <AdminSideBarContainer>
            <AdminSideBarLogo onClick={() => MenuHandler("home")}>
                AdminMode
            </AdminSideBarLogo>
            <AdminProfile admin={admin} />

            {admin.isLoggedIn ? (
                <AdminLoginedMenu
                    pages={loginPages}
                    currentActivePage={currentActivePage}
                    MenuHandler={MenuHandler}
                />
            ) : (
                <AdminLogoutMenu
                    page={logoutPage}
                    currentActivePage={currentActivePage}
                    MenuHandler={MenuHandler}
                />
            )}
        </AdminSideBarContainer>
    );
};

const AdminSideBarContainer = styled.div`
    width: 20%;
    height: 100%;
    background-color: ${Color.sidebar};
    display: flex;
    flex-direction: column;
    align-items: center;

    /* mainContentが多くなっても固定されるように */
    position: fixed;
    border-right: 1px solid ${Color.sidebarBorder};

    z-index: ${Zindex.sidebarComp};
`;

const AdminSideBarLogo = styled.div`
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
