import { UserRepositoryInterface } from "../repository/user/UserRepositoryInterface";
import { userInputType, userEntityListType } from "../repository/user/userType";
import { Result } from "../../util/ErrorObject";
import { userErrorType } from "../error/user/userErrorType";
import { User } from "../entity/User";

export class UserInteractor {
    private UserRepository: UserRepositoryInterface;

    constructor(UserRepository: UserRepositoryInterface) {
        this.UserRepository = UserRepository;
    }

    async updateUser(
        userObj: userInputType,
        userId: number
    ): Promise<Result<User, userErrorType>> {
        const res = await this.UserRepository.updateUser(userObj, userId);
        return res;
    }
    async deleteUser(userId: number): Promise<Result<boolean, userErrorType>> {
        const res = await this.UserRepository.deleteUser(userId);
        return res;
    }

    async updateUserFromAdmin(
        userObj: userInputType,
        userId: number
    ): Promise<Result<User, userErrorType>> {
        const res = await this.UserRepository.updateUserFromAdmin(
            userObj,
            userId
        );
        return res;
    }
    async deleteUserFromAdmin(
        userId: number
    ): Promise<Result<boolean, userErrorType>> {
        const res = await this.UserRepository.deleteUserFromAdmin(userId);
        return res;
    }
    async searchByName(
        name: string
    ): Promise<Result<userEntityListType, unknown>> {
        const res = await this.UserRepository.searchByName(name);
        return res;
    }
    async getAllUser(): Promise<userEntityListType> {
        const res = await this.UserRepository.getAllUser();
        return res;
    }
}
