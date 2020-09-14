import { Result } from "../../util/ErrorObject";
import { AuthCheckRepositoryInterface } from "../repository/authCheck/AuthCheckRepositoryInterface";

export class AuthCheckInteractor {
    private AuthCheckRepository: AuthCheckRepositoryInterface;

    constructor(AuthCheckRepository: AuthCheckRepositoryInterface) {
        this.AuthCheckRepository = AuthCheckRepository;
    }
    //errorは発生しない
    async authCheckUser(): Promise<boolean> {
        const res = await this.AuthCheckRepository.authCheckUser();
        return res;
    }

    async authCheckAdmin(): Promise<boolean> {
        const res = await this.AuthCheckRepository.authCheckAdmin();
        return res;
    }
}
