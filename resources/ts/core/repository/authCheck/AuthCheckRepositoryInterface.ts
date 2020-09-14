export interface AuthCheckRepositoryInterface {
    authCheckUser(): Promise<boolean>;
    authCheckAdmin(): Promise<boolean>;
}
