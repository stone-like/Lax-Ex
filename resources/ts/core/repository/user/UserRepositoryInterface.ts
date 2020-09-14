import { userErrorType } from "../../error/user/userErrorType";
import { Result } from "../../../util/ErrorObject";
import { User } from "../../entity/User";
import { userInputType } from "./userType";
import { userEntityListType } from "../signUp/authType";

export interface UserRepositoryInterface {
    updateUser(
        userObj: userInputType,
        userId: number
    ): Promise<Result<User, userErrorType>>;
    deleteUser(userId: number): Promise<Result<boolean, userErrorType>>;
    updateUserFromAdmin(
        userObj: userInputType,
        userId: number
    ): Promise<Result<User, userErrorType>>;
    deleteUserFromAdmin(
        userId: number
    ): Promise<Result<boolean, userErrorType>>;
    searchByName(name: string): Promise<Result<userEntityListType, unknown>>;
    getAllUser(): Promise<userEntityListType>;
}
