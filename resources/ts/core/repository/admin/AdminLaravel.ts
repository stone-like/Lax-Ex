import axios from "axios";
import { AdminRepositoryInterface } from "./AdminRepositoryInterface";
import {
    adminType,
    adminEntityListType,
    adminListFromResourceType
} from "./AdminType";
import { Admin } from "../../entity/Admin";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { roleToAdminErrorType } from "../../error/admin/adminErrorType";
import { ConvertPermissionsToEntityList } from "../../dto/permission/ConvertPermissionEntity";
export class AdminLaravel implements AdminRepositoryInterface {
    async getAllAdmin(): Promise<adminEntityListType> {
        const adminList: adminListFromResourceType = await axios.get(
            "/api/admin/admins"
        );
        const adminEntityList = adminList.data.data.map((admin: adminType) => {
            return new Admin(
                admin.id,
                admin.email,
                admin.name,
                ConvertPermissionsToEntityList(admin.permissions),
                admin.role,
                admin.role_id,
                true
            );
        });
        return adminEntityList;
    }

    async searchByName(
        name: string
    ): Promise<Result<adminEntityListType, unknown>> {
        try {
            const adminList: adminListFromResourceType = await axios.post(
                "/api/admin/admins/searchByName",
                {
                    name
                }
            );

            const adminEntityList = adminList.data.data.map(
                (admin: adminType) => {
                    return new Admin(
                        admin.id,
                        admin.email,
                        admin.name,
                        ConvertPermissionsToEntityList(admin.permissions),
                        admin.role,
                        admin.role_id,
                        true
                    );
                }
            );
            return new Success(adminEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async assignRole(
        adminId: number,
        roleId: number
    ): Promise<Result<boolean, roleToAdminErrorType>> {
        try {
            await axios.post("/api/admin/assignroles", {
                admin_id: adminId,
                role_id: roleId
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async removeRole(
        adminId: number,
        roleId: number
    ): Promise<Result<boolean, roleToAdminErrorType>> {
        try {
            await axios.post("/api/admin/removeroles", {
                admin_id: adminId,
                role_id: roleId
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async syncRole(
        adminId: number,
        roleId: number
    ): Promise<Result<boolean, roleToAdminErrorType>> {
        try {
            await axios.post("/api/admin/syncroles", {
                admin_id: adminId,
                role_id: roleId
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
}
