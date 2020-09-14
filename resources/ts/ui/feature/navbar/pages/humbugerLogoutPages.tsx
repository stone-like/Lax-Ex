import React from "react";
import { FiLogIn } from "react-icons/fi";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";

export const humbugerLogoutPages = [
    {
        title: "category",
        to: "category",
        icon: <BsReverseLayoutTextSidebarReverse />
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
