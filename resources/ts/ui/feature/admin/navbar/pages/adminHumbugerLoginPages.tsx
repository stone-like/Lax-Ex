import React from "react";
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
export const adminHumbugerLoginPages = [
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
