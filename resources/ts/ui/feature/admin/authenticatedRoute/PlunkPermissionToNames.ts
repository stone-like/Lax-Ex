import { permissionEntityListType } from "../../../../core/repository/permission/PermissionType";

export const plunkPermissionToNames = (
    permissionList: permissionEntityListType
): string[] => {
    const nameList = permissionList.map(permission => {
        return permission.name;
    });
    return nameList;
};
