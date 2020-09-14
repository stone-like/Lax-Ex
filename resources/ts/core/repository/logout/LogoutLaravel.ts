import { LogoutRepositoryInterface } from "./LogoutRespositoryInterface";
import axios from "axios";

export class LogoutLaravel implements LogoutRepositoryInterface{
    async logoutUser(){
       await axios.post("/api/logout");
    }
    async logoutAdmin(){
       await axios.post("/api/admin/logout");
    }
}