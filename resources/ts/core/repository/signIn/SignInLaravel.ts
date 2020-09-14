import axios from "axios";
import { User } from "../../entity/User";
import { signInErrorType } from "../../error/signIn/signInErrorType";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { SignInCredential } from "../../entity/SignInCredential";
import { SignInRepositoryInterface } from "./signInRepositoryInterface";
import { Admin } from "../../entity/Admin";
import { userFromBackEndType } from "../user/userType";
import { adminFromBackEndType } from "../admin/AdminType";
export class SignInLaravel implements SignInRepositoryInterface {
    async signInUser(
        credential: SignInCredential
    ): Promise<Result<User, signInErrorType>> {
        try {
            const res: userFromBackEndType = await axios.post("/api/login", {
                email: credential.email,
                password: credential.password
            });
            //本当はres.dataにloggedInを持たせた方がいいのかもしれないけど、backendの情報でもないのでここで入れている

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

    async signInAdmin(
        credential: SignInCredential
    ): Promise<Result<Admin, signInErrorType>> {
        try {
            const res: adminFromBackEndType = await axios.post(
                "/api/admin/login",
                {
                    email: credential.email,
                    password: credential.password
                }
            );

            console.log(res);

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
