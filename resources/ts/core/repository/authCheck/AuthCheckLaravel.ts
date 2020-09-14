import axios from "axios";
import { AuthCheckRepositoryInterface } from "./AuthCheckRepositoryInterface";
import { authCheckType } from "./AuthCheckType";
import { convertNumberToBoolean } from "../../dto/authCheck/authCheckDTO";
export class AuthCheckLaravel implements AuthCheckRepositoryInterface {
    async authCheckUser(): Promise<boolean> {
        const res: authCheckType = await axios.get("/api/auth");
        return res.data.authCheck;
    }
    async authCheckAdmin(): Promise<boolean> {
        const res: authCheckType = await axios.get("/api/admin/auth");
        return res.data.authCheck;
    }
}
