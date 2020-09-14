import { SETUSER, CLEARUSER } from "./UserConstants"
import { User } from "../../../../core/entity/User";
import { userState } from "./UserType";

export type userPayloadType = {
   user:User
}
export type setUserType = {
    type:"SETUSER",
    payload:userPayloadType
}
export type clearUserType = {
    type:"CLEARUSER"
}

export const setUser = (user:User):setUserType => ({type:"SETUSER",payload:{user}});
export const clearUser = ():clearUserType => ({type:"CLEARUSER"});

export type allUserActionType = setUserType | clearUserType;