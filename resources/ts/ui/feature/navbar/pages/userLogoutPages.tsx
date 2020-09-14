import React from "react";
import { FiLogIn } from "react-icons/fi";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
export const userLogoutPages = [
    {
        title: "category",
        to: "category",
        icon: <BsReverseLayoutTextSidebarReverse />
    },
    {
        title: "cart",
        to: "cart",
        icon: <FaShoppingCart />
    },
    {
        title: "login",
        to: "login",
        icon: <FiLogIn />
    },
    {
        title: "register",
        to: "register",
        icon: <MdAssignmentTurnedIn />
    }
];
