import { LogoutRepositoryInterface } from "../repository/logout/LogoutRespositoryInterface";

export class LogoutInteractor{
    private logoutRepository: LogoutRepositoryInterface;
    
    constructor(logoutRepository:LogoutRepositoryInterface){
        this.logoutRepository = logoutRepository;
    }

    async logoutUser(){
        await this.logoutRepository.logoutUser();
    }

    async logoutAdmin(){
        await this.logoutRepository.logoutAdmin();
    }
    

    
}