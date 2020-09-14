import { Admin } from "../../entity/Admin";
import { Permission } from "../../entity/Permission";
import { Email } from "../../entity/Email";

export type adminListFromResourceType = {
    data: { data: adminType[] };
};
export type adminType = {
    id: number;
    name: string;
    email: string;
    permissions: Permission[];
    role: string;
    role_id: number;
};

export type adminFromBackEndType = {
    data: adminType;
};
export type adminEntityListType = Admin[];
