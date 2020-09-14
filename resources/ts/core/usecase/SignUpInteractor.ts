import { User } from "../entity/User";
import { Admin } from "../entity/Admin";
import { SignUpCredential } from "../entity/SignUpCredential";
import { Result } from "../../util/ErrorObject";
import { signUpErrorType } from "../error/signUp/signUpErrorType";
import { SignUpRepositoryInterface } from "../repository/signUp/SignUpRepositoryInterface";

export class SignUpInteractor {
    private signUpRepository: SignUpRepositoryInterface;

    constructor(signUpRepository: SignUpRepositoryInterface) {
        this.signUpRepository = signUpRepository;
    }

    async signUpUser(
        credential: SignUpCredential
    ): Promise<Result<User, signUpErrorType>> {
        const res: Result<
            User,
            signUpErrorType
        > = await this.signUpRepository.signUpUser(credential);

        return res;
    }
    async signUpAdmin(
        credential: SignUpCredential
    ): Promise<Result<Admin, signUpErrorType>> {
        const res: Result<
            Admin,
            signUpErrorType
        > = await this.signUpRepository.signUpAdmin(credential);

        return res;
    }
}
