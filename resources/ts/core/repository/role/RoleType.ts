import { Role } from "../../entity/Role";
import { Permission } from "../../entity/Permission";
import { permissionType } from "../permission/PermissionType";

export type roleEntityListType = Role[];

export type roleType = {
    id: number;
    name: string;
    permissions: permissionType[];
};
export type roleFromBackEndType = {
    data: roleType;
};
export type roleFromResourceType = {
    data: {
        data: roleType;
    };
};
export type roleListFromBackEndType = {
    data: roleType[];
};
export type roleListFromResourceType = {
    data: {
        data: roleType[];
    };
};
