export class BuyProduct {
    private _imagePath: string;
    private _price: string;
    private _name: string;
    private _slug: string;
    private _buyQuantity: string;
    private _subtotal: string;

    constructor(
        imagePath: string,
        subtotal: string,
        name: string,
        slug: string,
        buyQuantity: string,
        price: string
    ) {
        this._name = name;
        this._slug = slug;
        this._price = price;
        this._buyQuantity = buyQuantity;
        this._subtotal = subtotal;
        this._imagePath = imagePath;
    }

    get price(): string {
        return this._price;
    }
    get buyQuantity(): string {
        return this._buyQuantity;
    }
    get subtotal(): string {
        return this._subtotal;
    }
    get imagePath(): string {
        return this._imagePath;
    }
    get name(): string {
        return this._name;
    }
    get slug(): string {
        return this._slug;
    }
}
