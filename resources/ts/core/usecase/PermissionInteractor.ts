import { Result } from "../../util/ErrorObject";
import { permissionEntityListType } from "../repository/permission/PermissionType";
import { permissionErrorType } from "../error/permission/permissionErrorType";
import { Permission } from "../entity/Permission";
import { PermissionRepositoryInterface } from "../repository/permission/PermissionRepositoryInterface";

export class PermissionInteractor {
    private PermissionRepository: PermissionRepositoryInterface;

    constructor(PermissionRepository: PermissionRepositoryInterface) {
        this.PermissionRepository = PermissionRepository;
    }
    async createPermission(
        permissionName: string
    ): Promise<Result<Permission, permissionErrorType>> {
        const res = await this.PermissionRepository.createPermission(
            permissionName
        );
        return res;
    }
    async updatePermission(
        permissionName: string,
        permissionId: number
    ): Promise<Result<Permission, permissionErrorType>> {
        const res = await this.PermissionRepository.updatePermission(
            permissionName,
            permissionId
        );
        return res;
    }
    async deletePermission(
        permissionId: number
    ): Promise<Result<boolean, permissionErrorType>> {
        const res = await this.PermissionRepository.deletePermission(
            permissionId
        );
        return res;
    }
    async searchByName(
        name: string
    ): Promise<Result<permissionEntityListType, unknown>> {
        const res = await this.PermissionRepository.searchByName(name);
        return res;
    }
    async getAllPermission(): Promise<permissionEntityListType> {
        const res = await this.PermissionRepository.getAllPermission();
        return res;
    }
}
