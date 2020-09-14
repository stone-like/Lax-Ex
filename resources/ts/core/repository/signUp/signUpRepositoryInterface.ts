import { User } from "../../entity/User";
import { Admin } from "../../entity/Admin";
import { SignUpCredential } from "../../entity/SignUpCredential";
import { signUpErrorType } from "../../error/signUp/signUpErrorType";
import { Result } from "../../../util/ErrorObject";

export interface SignUpRepositoryInterface {
    signUpUser: (
        credential: SignUpCredential
    ) => Promise<Result<User, signUpErrorType>>;
    signUpAdmin: (
        credential: SignUpCredential
    ) => Promise<Result<Admin, signUpErrorType>>;
}
