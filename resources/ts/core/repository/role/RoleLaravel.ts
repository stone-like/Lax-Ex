import { RoleRepositoryInterface } from "./RoleRepositoryInterface";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { Role } from "../../entity/Role";
import {
    roleErrorType,
    permissionToRoleErrorType
} from "../../error/role/roleErrorType";
import {
    roleEntityListType,
    roleListFromBackEndType,
    roleFromBackEndType,
    roleListFromResourceType,
    roleFromResourceType,
    roleType
} from "./RoleType";
import axios from "axios";
import { ConvertPermissionsToEntityList } from "../../dto/permission/ConvertPermissionEntity";

//ここで面倒なのがroleをEntityに変換するだけではなく、permissionも変換しなくてはいけない
export class RoleLaravel implements RoleRepositoryInterface {
    async updateRole(
        roleName: string,
        roleId: number
    ): Promise<Result<Role, roleErrorType>> {
        try {
            const role: roleFromResourceType = await axios.patch(
                `/api/admin/roles/${roleId}`,
                {
                    name: roleName
                }
            );
            const roleEntity = new Role(
                role.data.data.id,
                role.data.data.name,
                ConvertPermissionsToEntityList(role.data.data.permissions)
            );
            return new Success(roleEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async createRole(roleName: string): Promise<Result<Role, roleErrorType>> {
        try {
            const role: roleFromResourceType = await axios.post(
                `/api/admin/roles`,
                { name: roleName }
            );
            const roleEntity = new Role(
                role.data.data.id,
                role.data.data.name,
                ConvertPermissionsToEntityList(role.data.data.permissions)
            );
            return new Success(roleEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async deleteRole(roleId: number): Promise<Result<boolean, roleErrorType>> {
        try {
            await axios.delete(`/api/admin/roles/${roleId}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async searchByName(
        name: string
    ): Promise<Result<roleEntityListType, unknown>> {
        try {
            const roleList: roleListFromResourceType = await axios.post(
                "/api/admin/roles/searchByName",
                {
                    name
                }
            );

            const roleEntityList = roleList.data.data.map((role: roleType) => {
                return new Role(
                    role.id,
                    role.name,
                    ConvertPermissionsToEntityList(role.permissions)
                );
            });
            return new Success(roleEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async getAllRole(): Promise<roleEntityListType> {
        const roleList: roleListFromResourceType = await axios.get(
            "/api/admin/roles"
        );

        const roleEntityList = roleList.data.data.map((role: roleType) => {
            return new Role(
                role.id,
                role.name,
                ConvertPermissionsToEntityList(role.permissions)
            );
        });
        return roleEntityList;
    }

    async assignPermissions(
        roleId: number,
        permissionIds: number[]
    ): Promise<Result<boolean, permissionToRoleErrorType>> {
        try {
            await axios.post("/api/admin/assignpermissions", {
                role_id: roleId,
                permission_ids: permissionIds
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async removePermissions(
        roleId: number,
        permissionIds: number[]
    ): Promise<Result<boolean, permissionToRoleErrorType>> {
        try {
            await axios.post("/api/admin/removepermissions", {
                role_id: roleId,
                permission_ids: permissionIds
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async syncPermissions(
        roleId: number,
        permissionIds: number[]
    ): Promise<Result<boolean, permissionToRoleErrorType>> {
        try {
            await axios.post("/api/admin/syncpermissions", {
                role_id: roleId,
                permission_ids: permissionIds
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
}
