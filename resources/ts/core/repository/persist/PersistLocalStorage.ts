import { PersistRepositoryInterface } from "./PersistRepositoryInterface";
import {
    persistInputValueType,
    restoreAdminType,
    restoreUserType,
    keyType
} from "./PersistType";
import { Result, Failure, Success } from "../../../util/ErrorObject";
import { User } from "../../entity/User";
import { userType } from "../user/userType";
import { Admin } from "../../entity/Admin";
import { convertLocalStorageToEntity } from "../../dto/persist/persistDTO";

export class PersistLocalStorage implements PersistRepositoryInterface {
    setLocalStorageWithExpiry(
        key: string,
        value: persistInputValueType,
        ttl: number
    ) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    }
    getUserFromLocalStorage(): Result<User, null> {
        const itemStr = localStorage.getItem("user");

        if (!itemStr) {
            return new Failure(null);
        }
        const item: restoreUserType = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
            localStorage.removeItem("user");
            return new Failure(null);
        }
        const user = new User(
            item.value.id,
            item.value.email.email,
            item.value.name,
            item.value.permissions,
            item.value.role,
            true
        );
        return new Success(user);
    }
    getAdminFromLocalStorage(): Result<Admin, null> {
        const itemStr = localStorage.getItem("admin");

        if (!itemStr) {
            return new Failure(null);
        }
        const item: restoreAdminType = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
            localStorage.removeItem("admin");
            return new Failure(null);
        }
        const admin = new Admin(
            item.value.id,
            item.value.email.email,
            item.value.name,
            item.value.permissions,
            item.value.role,
            item.value.role_id,
            true
        );
        return new Success(admin);
    }
    // getLocalStorageWithExpiry(key: keyType): Result<User | Admin, null> {
    //     if (key === "user") {
    //         return this.getUserFromLocalStorage(key);
    //     }
    //     if (key === "admin") {
    //         return this.getAdminFromLocalStorage(key);
    //     }
    // }
    removeLocalStorage(key: string) {
        localStorage.removeItem(key);
    }
}
