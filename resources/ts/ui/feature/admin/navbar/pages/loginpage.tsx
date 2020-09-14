import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
    BsPeopleCircle,
    BsReverseLayoutTextSidebarReverse
} from "react-icons/bs";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import {
    AiOutlineSend,
    AiOutlineBuild,
    AiFillStar,
    AiOutlineCloud
} from "react-icons/ai";

export const loginPages = [
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
        title: "logout",
        to: "logout",
        icon: <FiLogOut />
    }
];
