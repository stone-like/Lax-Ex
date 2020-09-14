import { SignInRepositoryInterface } from "../repository/signIn/signInRepositoryInterface";
import { SignInCredential } from "../entity/SignInCredential";
import { Result } from "../../util/ErrorObject";
import { User } from "../entity/User";
import { signInErrorType } from "../error/signIn/signInErrorType";
import { Admin } from "../entity/Admin";

export class SignInInteractor {
    private signInRepository: SignInRepositoryInterface;

    constructor(signInRepository: SignInRepositoryInterface) {
        this.signInRepository = signInRepository;
    }

    async signInUser(
        credential: SignInCredential
    ): Promise<Result<User, signInErrorType>> {
        const res: Result<
            User,
            signInErrorType
        > = await this.signInRepository.signInUser(credential);

        return res;
    }
    async signInAdmin(
        credential: SignInCredential
    ): Promise<Result<Admin, signInErrorType>> {
        const res: Result<
            Admin,
            signInErrorType
        > = await this.signInRepository.signInAdmin(credential);

        return res;
    }
}
