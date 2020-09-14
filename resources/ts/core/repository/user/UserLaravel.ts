import { UserRepositoryInterface } from "./UserRepositoryInterface";
import {
    userInputType,
    userListFromBackEndType,
    userEntityListType,
    userFromBackEndType,
    userType
} from "./userType";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { User } from "../../entity/User";
import { userErrorType } from "../../error/user/userErrorType";
import axios from "axios";
export class UserLaravel implements UserRepositoryInterface {
    async updateUser(
        userObj: userInputType,
        userId: number
    ): Promise<Result<User, userErrorType>> {
        try {
            const res: userFromBackEndType = await axios.patch(
                `/api/users/${userId}`,
                userObj
            );
            const user = new User(
                res.data.id,
                res.data.email,
                res.data.name,
                res.data.permissions,
                res.data.role,
                true
            );
            return new Success(user);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async updateUserFromAdmin(
        userObj: userInputType,
        userId: number
    ): Promise<Result<User, userErrorType>> {
        try {
            const res: userFromBackEndType = await axios.patch(
                `/api/admin/users/${userId}`,
                userObj
            );
            const user = new User(
                res.data.id,
                res.data.email,
                res.data.name,
                res.data.permissions,
                res.data.role,
                true
            );
            return new Success(user);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async deleteUser(userId: number): Promise<Result<boolean, userErrorType>> {
        try {
            await axios.delete(`/api/users/${userId}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async deleteUserFromAdmin(
        userId: number
    ): Promise<Result<boolean, userErrorType>> {
        try {
            await axios.delete(`/api/admin/users/${userId}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async getAllUser(): Promise<userEntityListType> {
        const userList: userListFromBackEndType = await axios.get(
            "/api/admin/users"
        );
        const userEntityList = userList.data.map((user: userType) => {
            return new User(
                user.id,
                user.email,
                user.name,
                user.permissions,
                user.role,
                true
            );
        });
        return userEntityList;
    }

    async searchByName(
        name: string
    ): Promise<Result<userEntityListType, unknown>> {
        try {
            const userList: userListFromBackEndType = await axios.post(
                "/api/admin/users/searchByName",
                {
                    name
                }
            );

            const userEntityList = userList.data.map((user: userType) => {
                return new User(
                    user.id,
                    user.email,
                    user.name,
                    user.permissions,
                    user.role,
                    true
                );
            });
            return new Success(userEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
}
