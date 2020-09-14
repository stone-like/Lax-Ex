export class Category {
    private _id: number;
    private _name: string;
    private _slug: string;
    private _productCount: number;

    constructor(id: number, name: string, slug: string, productCount: number) {
        this._id = id;

        this._name = name;

        this._slug = slug;

        this._productCount = productCount;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get slug(): string {
        return this._slug;
    }

    get productCount(): number {
        return this._productCount;
    }
}
