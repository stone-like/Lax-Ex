import { User } from "../../entity/User";
import { Email } from "../../entity/Email";

export type userInputType = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type userType = {
    id: number;
    name: string;
    email: string;
    permissions: string[];
    role: string;
};
export type userFromBackEndType = {
    data: userType;
};
export type userListFromBackEndType = {
    data: userType[];
};
export type userEntityListType = User[];
