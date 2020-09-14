import axios from "axios";
import { User } from "../../entity/User";
import { Admin } from "../../entity/Admin";
import { SignUpCredential } from "../../entity/SignUpCredential";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { signUpErrorType } from "../../error/signUp/signUpErrorType";
import { SignUpRepositoryInterface } from "./SignUpRepositoryInterface";
import { adminFromBackEndType } from "../admin/AdminType";
import { userFromBackEndType } from "../user/userType";

//バックとフロントの境界なので、送るときはplainDataに、フロント側にもってくるときはEntityに
export class SignUpLaravel implements SignUpRepositoryInterface {
    async signUpUser(
        credential: SignUpCredential
    ): Promise<Result<User, signUpErrorType>> {
        try {
            const res: userFromBackEndType = await axios.post("/api/register", {
                name: credential.username,
                email: credential.email,
                password: credential.password,
                password_confirmation: credential.password_confirmation
            });
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

    //adminRegisterは実際にregisterした後loginするわけではないので注意
    async signUpAdmin(
        credential: SignUpCredential
    ): Promise<Result<Admin, signUpErrorType>> {
        try {
            const res: adminFromBackEndType = await axios.post(
                "/api/admin/register",
                {
                    name: credential.username,
                    email: credential.email,
                    password: credential.password,
                    password_confirmation: credential.password_confirmation
                }
            );
            const admin = new Admin(
                res.data.id,
                res.data.email,
                res.data.name,
                res.data.permissions,
                res.data.role,
                res.data.role_id,
                true
            );
            return new Success(admin);
        } catch (error) {
            console.log(error.response);
            return new Failure(error.response.data.errors);
        }
    }
}
