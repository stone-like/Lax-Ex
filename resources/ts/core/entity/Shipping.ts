export class Shipping {
    private _id: number;
    private _name: string;
    private _price: number;

    constructor(id: number, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
    }
    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
    get price(): number {
        return this._price;
    }
}
