import { Result } from "../../../util/ErrorObject";
import { Permission } from "../../entity/Permission";
import { permissionErrorType } from "../../error/permission/permissionErrorType";
import { permissionEntityListType } from "./PermissionType";

export interface PermissionRepositoryInterface {
    createPermission(
        permissionName: string
    ): Promise<Result<Permission, permissionErrorType>>;
    updatePermission(
        permissionName: string,
        permissionId: number
    ): Promise<Result<Permission, permissionErrorType>>;
    deletePermission(
        permissionId: number
    ): Promise<Result<boolean, permissionErrorType>>;
    searchByName(
        name: string
    ): Promise<Result<permissionEntityListType, unknown>>;
    getAllPermission(): Promise<permissionEntityListType>;
}
