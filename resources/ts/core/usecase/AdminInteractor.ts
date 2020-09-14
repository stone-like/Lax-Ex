import { Result } from "../../util/ErrorObject";
import { AdminRepositoryInterface } from "../repository/admin/AdminRepositoryInterface";
import { adminEntityListType } from "../repository/admin/AdminType";
import { roleToAdminErrorType } from "../error/admin/adminErrorType";

export class AdminInteractor {
    private AdminRepository: AdminRepositoryInterface;

    constructor(AdminRepository: AdminRepositoryInterface) {
        this.AdminRepository = AdminRepository;
    }
    //いまsuperadminがついてるやつは取ってこれないようにしたい
    async searchByName(
        name: string
    ): Promise<Result<adminEntityListType, unknown>> {
        const res = await this.AdminRepository.searchByName(name);
        return res;
    }
    //いまsuperadminがついてるやつは取ってこれないようにしたい
    async getAllAdmin(): Promise<adminEntityListType> {
        const res = await this.AdminRepository.getAllAdmin();
        return res;
    }
    async removeRole(
        adminId: number,
        roleId: number
    ): Promise<Result<boolean, roleToAdminErrorType>> {
        const res = await this.AdminRepository.removeRole(adminId, roleId);
        return res;
    }
    async assignRole(
        adminId: number,
        roleId: number
    ): Promise<Result<boolean, roleToAdminErrorType>> {
        const res = await this.AdminRepository.assignRole(adminId, roleId);
        return res;
    }
    async syncRole(
        adminId: number,
        roleId: number
    ): Promise<Result<boolean, roleToAdminErrorType>> {
        const res = await this.AdminRepository.syncRole(adminId, roleId);
        return res;
    }
}
