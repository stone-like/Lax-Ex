import { User } from "../../entity/User";
import { Admin } from "../../entity/Admin";
import {
    restoreUserType,
    restoreAdminType,
    keyType
} from "../../repository/persist/PersistType";

export const convertLocalStorageToEntity = (
    item: restoreUserType | restoreAdminType,
    key: keyType
): User | Admin => {
    switch (key) {
        case "user": {
            const user = new User(
                item.value.id,
                item.value.email,
                item.value.name,
                item.value.permissions,
                item.value.role,
                true
            );
            return user;
        }
        case "admin": {
            const admin = new Admin(
                item.value.id,
                item.value.email,
                item.value.name,
                item.value.permissions,
                item.value.role,
                item.value.role_id,
                true
            );
            return admin;
        }
    }
};
