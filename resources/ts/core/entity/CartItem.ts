export class CartItem {
    private _rowId: string;
    private _imagePath: string;
    private _price: number;
    private _name: string;
    private _quantity: number;
    private _subtotal: string;

    constructor(
        rowId: string,
        imagePath: string,
        subtotal: string,
        name: string,
        quantity: number,
        price: number
    ) {
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._subtotal = subtotal;
        this._imagePath = imagePath;
        this._rowId = rowId;
    }

    get rowId(): string {
        return this._rowId;
    }
    get price(): number {
        return this._price;
    }
    get quantity(): number {
        return this._quantity;
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
}
