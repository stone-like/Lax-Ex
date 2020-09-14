import { persistInputValueType } from "./PersistType";
import { User } from "../../entity/User";
import { Admin } from "../../entity/Admin";
import { Result } from "../../../util/ErrorObject";

export interface PersistRepositoryInterface {
    setLocalStorageWithExpiry(
        key: string,
        value: persistInputValueType,
        ttl: number
    ): void;
    // getLocalStorageWithExpiry(key: string): Result<User, null>;
    getUserFromLocalStorage(): Result<User, null>;
    getAdminFromLocalStorage(): Result<Admin, null>;
    removeLocalStorage(key: string): void;
}
