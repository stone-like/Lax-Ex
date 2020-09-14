import React from "react";
import {
    AiOutlineUser,
    AiFillCreditCard,
    AiOutlineHistory
} from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa";
export const profileContent = [
    {
        title: "address",
        to: "/userProfile/address",
        icon: <FaAddressBook />
    },
    {
        title: "card",
        to: "/userProfile/card",
        icon: <AiFillCreditCard />
    },
    {
        title: "orderHistory",
        to: "/orderHistory",
        icon: <AiOutlineHistory />
    },
    {
        title: "updateUser",
        to: "/userProfile/update",
        icon: <AiOutlineUser />
    }
];
