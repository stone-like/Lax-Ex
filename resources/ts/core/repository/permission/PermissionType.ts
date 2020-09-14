import { Permission } from "../../entity/Permission";

export type permissionType = {
    id: number;
    name: string;
};
export type permissionFromBackEndType = {
    data: permissionType;
};

export type permissionListFromBackEndType = {
    data: permissionType[];
};

export type permissionListType = permissionType[];

export type permissionEntityListType = Permission[];
