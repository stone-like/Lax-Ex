import { SignInCredential } from "../../entity/SignInCredential";
import { signInErrorType } from "../../error/signIn/signInErrorType";
import { User } from "../../entity/User";
import { Admin } from "../../entity/Admin";
import { Result } from "../../../util/ErrorObject";

export interface SignInRepositoryInterface {
    signInUser: (
        credential: SignInCredential
    ) => Promise<Result<User, signInErrorType>>;
    signInAdmin: (
        credential: SignInCredential
    ) => Promise<Result<Admin, signInErrorType>>;
}
