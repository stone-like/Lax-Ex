import { Result } from "../../../util/ErrorObject";
import { Role } from "../../entity/Role";
import {
    roleErrorType,
    permissionToRoleErrorType
} from "../../error/role/roleErrorType";
import { roleEntityListType } from "./RoleType";

export interface RoleRepositoryInterface {
    createRole(roleName: string): Promise<Result<Role, roleErrorType>>;
    updateRole(
        roleName: string,
        roleId: number
    ): Promise<Result<Role, roleErrorType>>;
    deleteRole(roleId: number): Promise<Result<boolean, roleErrorType>>;
    searchByName(name: string): Promise<Result<roleEntityListType, unknown>>;
    getAllRole(): Promise<roleEntityListType>;

    assignPermissions(
        roleId: number,
        permissionIds: number[]
    ): Promise<Result<boolean, permissionToRoleErrorType>>;
    removePermissions(
        roleId: number,
        permissionIds: number[]
    ): Promise<Result<boolean, permissionToRoleErrorType>>;
    syncPermissions(
        roleId: number,
        permissionIds: number[]
    ): Promise<Result<boolean, permissionToRoleErrorType>>;
}
