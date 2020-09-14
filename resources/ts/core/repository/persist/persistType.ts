import { Admin } from "../../entity/Admin";
import { User } from "../../entity/User";
import { adminType } from "../admin/AdminType";
import { userType } from "../user/userType";

export type persistInputValueType = User | Admin;

export type restoreUserType = {
    value: userType;
    expiry: number;
};
export type restoreAdminType = {
    value: adminType;
    expiry: number;
};

export type keyType = "user" | "admin";
