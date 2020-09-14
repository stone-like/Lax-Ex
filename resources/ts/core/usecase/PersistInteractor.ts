import { PersistRepositoryInterface } from "../repository/persist/PersistRepositoryInterface";
import { persistInputValueType } from "../repository/persist/PersistType";
import { Result } from "../../util/ErrorObject";
import { Admin } from "../entity/Admin";
import { User } from "../entity/User";

export class PersistInteractor {
    private PersistRepository: PersistRepositoryInterface;

    constructor(PersistRepository: PersistRepositoryInterface) {
        this.PersistRepository = PersistRepository;
    }
    setLocalStorageWithExpiry(
        key: string,
        value: persistInputValueType,
        ttl: number
    ) {
        this.PersistRepository.setLocalStorageWithExpiry(key, value, ttl);
    }
    // getLocalStorageWithExpiry(key: string): Result<User | Admin, null> {
    //     return this.PersistRepository.getLocalStorageWithExpiry(key);
    // }
    getUserFromLocalStorage(): Result<User, null> {
        return this.PersistRepository.getUserFromLocalStorage();
    }
    getAdminFromLocalStorage(): Result<Admin, null> {
        return this.PersistRepository.getAdminFromLocalStorage();
    }
    removeLocalStorage(key: string) {
        this.PersistRepository.removeLocalStorage(key);
    }
}
