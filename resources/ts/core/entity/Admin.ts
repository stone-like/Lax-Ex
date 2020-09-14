import { Email } from "./Email";
import { Permission } from "./Permission";

export class Admin {
    //redux-persist+Entityの相性の悪さがひどい・・・
    //redux-persistはその時のreduxの状態をただ、保存するだけでAdminという属性はなくしてしまう、つまりもはやclassではないのでgetterが使えない
    //objectではあるのでアクセスはできるが・・・

    //idを取得すること
    // private _id: number;
    // private _email: Email;
    // private _name: string;
    // private _permissions: string[];
    // private _role: string;
    // private _isLoggedIn: boolean;

    // constructor(
    //     id: number,
    //     email: string,
    //     name: string,
    //     permissions: string[],
    //     role: string,
    //     isLoggedIn: boolean
    // ) {
    //     this._id = id;
    //     this._email = new Email(email);
    //     this._name = name;
    //     this._permissions = permissions;
    //     this._role = role;
    //     this._isLoggedIn = isLoggedIn;
    // }
    // get id(): number {
    //     return this._id;
    // }

    // get email(): string {
    //     return this._email.email;
    // }

    // get name(): string {
    //     return this._name;
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
    public permissions: Permission[];
    public role: string;
    public role_id: number;
    public isLoggedIn: boolean;

    constructor(
        id: number,
        email: string,
        name: string,
        permissions: Permission[],
        role: string,
        role_id: number,
        isLoggedIn: boolean
    ) {
        this.id = id;
        this.email = new Email(email);
        this.name = name;
        this.permissions = permissions;
        this.role = role;
        this.role_id = role_id;
        this.isLoggedIn = isLoggedIn;
    }
}
