import { adminEntityListType } from "./AdminType";
import { Result } from "../../../util/ErrorObject";
import { roleToAdminErrorType } from "../../error/admin/adminErrorType";

export interface AdminRepositoryInterface {
    searchByName(name: string): Promise<Result<adminEntityListType, unknown>>;
    getAllAdmin(): Promise<adminEntityListType>;
    removeRole(
        adminId: number,
        roleId: number
    ): Promise<Result<boolean, roleToAdminErrorType>>;
    assignRole(
        adminId: number,
        roleId: number
    ): Promise<Result<boolean, roleToAdminErrorType>>;
    syncRole(
        adminId: number,
        roleId: number
    ): Promise<Result<boolean, roleToAdminErrorType>>;
}
