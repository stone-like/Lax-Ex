import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
    BsPeopleCircle,
    BsReverseLayoutTextSidebarReverse
} from "react-icons/bs";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import {
    AiOutlineUser,
    AiOutlineSend,
    AiOutlineBuild,
    AiFillStar,
    AiOutlineCloud,
    AiOutlineHistory
} from "react-icons/ai";

export const humbugerLoginPages = [
    {
        title: "category",
        to: "category",
        icon: <BsReverseLayoutTextSidebarReverse />
    },
    {
        title: "userProfile",
        to: "userProfile",
        icon: <AiOutlineUser />
    },
    {
        title: "orderHistory",
        to: "orderHistory",
        icon: <AiOutlineHistory />
    },
    {
        title: "logout",
        to: "logout",
        icon: <FiLogOut />
    }
];
