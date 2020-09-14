import { Permission } from "./Permission";

export class Role {
    private _id: number;
    private _name: string;
    private _permissions: Permission[];

    constructor(id: number, name: string, permissions: Permission[]) {
        this._id = id;
        this._name = name;
        this._permissions = permissions;
    }
    get id(): number {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get permissions(): Permission[] {
        return this._permissions;
    }
}
