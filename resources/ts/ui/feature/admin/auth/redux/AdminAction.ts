import { Admin } from "../../../../../core/entity/Admin";

export type adminPayloadType = {
    admin:Admin
 }
 export type setAdminType = {
     type:"SETADMIN",
     payload:adminPayloadType
 }
 export type clearAdminType = {
     type:"CLEARADMIN"
 }
 
 export const setUser = (admin:Admin):setAdminType => ({type:"SETADMIN",payload:{admin}});
 export const clearAdmin = ():clearAdminType => ({type:"CLEARADMIN"});
 
 export type allAdminActionType = setAdminType | clearAdminType;