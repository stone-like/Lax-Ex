import { Permission } from "../../entity/Permission";
import { permissionListType } from "../../repository/permission/PermissionType";

export const ConvertPermissionsToEntityList = (
    permissions: permissionListType
): Permission[] => {
    const permissionEntityList = permissions.map(permission => {
        return new Permission(permission.id, permission.name);
    });

    return permissionEntityList;
};
