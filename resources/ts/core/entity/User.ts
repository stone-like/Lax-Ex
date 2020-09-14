import { Email } from "./Email";

export class User {
    //idを取得すること
    // private _id: number;
    // private _email: Email;
    // private _username: string;
    // private _permissions: string[];
    // private _role: string;
    // private _isLoggedIn: boolean;

    // constructor(
    //     id: number,
    //     email: string,
    //     username: string,
    //     permissions: string[],
    //     role: string,
    //     isLoggedIn: boolean
    // ) {
    //     this._id = id;
    //     this._email = new Email(email);
    //     this._username = username;
    //     this._permissions = permissions;
    //     this._isLoggedIn = isLoggedIn;
    //     this._role = role;
    // }
    // get id(): number {
    //     return this._id;
    // }

    // get email(): string {
    //     return this._email.email;
    // }

    // get name(): string {
    //     return this._username;
    // }

    // get permissions(): string[] {
    //     return this._permissions;
    // }

    // get role(): string {
    //     return this._role;
    // }

    // get isLoggedIn(): boolean {
    //     return this._isLoggedIn;
    // }

    public id: number;
    public email: Email;
    public name: string;
    public permissions: string[];
    public role: string;
    public isLoggedIn: boolean;

    constructor(
        id: number,
        email: string,
        name: string,
        permissions: string[],
        role: string,
        isLoggedIn: boolean
    ) {
        this.id = id;
        this.email = new Email(email);
        this.name = name;
        this.permissions = permissions;
        this.isLoggedIn = isLoggedIn;
        this.role = role;
    }
}
