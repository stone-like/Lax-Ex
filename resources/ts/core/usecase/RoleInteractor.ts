import { RoleRepositoryInterface } from "../repository/role/RoleRepositoryInterface";
import { Result } from "../../util/ErrorObject";
import { Role } from "../entity/Role";
import {
    roleErrorType,
    permissionToRoleErrorType
} from "../error/role/roleErrorType";
import { roleEntityListType } from "../repository/role/RoleType";

export class RoleInteractor {
    private RoleRepository: RoleRepositoryInterface;

    constructor(RoleRepository: RoleRepositoryInterface) {
        this.RoleRepository = RoleRepository;
    }
    async createRole(roleName: string): Promise<Result<Role, roleErrorType>> {
        const res = await this.RoleRepository.createRole(roleName);
        return res;
    }
    async updateRole(
        roleName: string,
        roleId: number
    ): Promise<Result<Role, roleErrorType>> {
        const res = await this.RoleRepository.updateRole(roleName, roleId);
        return res;
    }
    async deleteRole(roleId: number): Promise<Result<boolean, roleErrorType>> {
        const res = await this.RoleRepository.deleteRole(roleId);
        return res;
    }
    async searchByName(
        name: string
    ): Promise<Result<roleEntityListType, unknown>> {
        const res = await this.RoleRepository.searchByName(name);
        return res;
    }
    async getAllRole(): Promise<roleEntityListType> {
        const res = await this.RoleRepository.getAllRole();
        return res;
    }
    async assignPermissions(
        roleId: number,
        permissionIds: number[]
    ): Promise<Result<boolean, permissionToRoleErrorType>> {
        const res = await this.RoleRepository.assignPermissions(
            roleId,
            permissionIds
        );
        return res;
    }
    async removePermissions(
        roleId: number,
        permissionIds: number[]
    ): Promise<Result<boolean, permissionToRoleErrorType>> {
        const res = await this.RoleRepository.removePermissions(
            roleId,
            permissionIds
        );
        return res;
    }
    async syncPermissions(
        roleId: number,
        permissionIds: number[]
    ): Promise<Result<boolean, permissionToRoleErrorType>> {
        const res = await this.RoleRepository.syncPermissions(
            roleId,
            permissionIds
        );
        return res;
    }
}
