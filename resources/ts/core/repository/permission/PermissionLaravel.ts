import { Result, Success, Failure } from "../../../util/ErrorObject";
import { Role } from "../../entity/Role";
import { roleErrorType } from "../../error/role/roleErrorType";
import axios from "axios";
import { ConvertPermissionsToEntityList } from "../../dto/permission/ConvertPermissionEntity";
import { Permission } from "../../entity/Permission";
import { permissionErrorType } from "../../error/permission/permissionErrorType";
import {
    permissionFromBackEndType,
    permissionEntityListType,
    permissionListFromBackEndType,
    permissionType
} from "./PermissionType";
import { PermissionRepositoryInterface } from "./PermissionRepositoryInterface";

export class PermissionLaravel implements PermissionRepositoryInterface {
    async createPermission(
        permissionName: string
    ): Promise<Result<Permission, permissionErrorType>> {
        try {
            const permission: permissionFromBackEndType = await axios.post(
                "/api/admin/permissions",
                { name: permissionName }
            );
            const permissionEntity = new Permission(
                permission.data.id,
                permission.data.name
            );
            return new Success(permissionEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async updatePermission(
        permissionName: string,
        permissionId: number
    ): Promise<Result<Permission, permissionErrorType>> {
        try {
            const permission: permissionFromBackEndType = await axios.patch(
                `/api/admin/permissions/${permissionId}`,
                { name: permissionName }
            );
            const permissionEntity = new Permission(
                permission.data.id,
                permission.data.name
            );
            return new Success(permissionEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async deletePermission(
        permissionId: number
    ): Promise<Result<boolean, permissionErrorType>> {
        try {
            await axios.delete(`/api/admin/permissions/${permissionId}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async searchByName(
        name: string
    ): Promise<Result<permissionEntityListType, unknown>> {
        try {
            const permissionList: permissionListFromBackEndType = await axios.post(
                "/api/admin/permissions/searchByName",
                {
                    name
                }
            );

            const permissionEntityList = permissionList.data.map(
                (permission: permissionType) => {
                    return new Permission(permission.id, permission.name);
                }
            );
            return new Success(permissionEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async getAllPermission(): Promise<permissionEntityListType> {
        const permissionList: permissionListFromBackEndType = await axios.get(
            "/api/admin/permissions"
        );

        const permissionEntityList = permissionList.data.map(
            (permission: permissionType) => {
                return new Permission(permission.id, permission.name);
            }
        );
        return permissionEntityList;
    }
}
