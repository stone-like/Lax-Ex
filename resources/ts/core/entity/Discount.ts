export class Discount {
    private _id: number;
    private _discountCode: string;
    private _discountPrice: number;

    constructor(id: number, discountCode: string, discountPrice: number) {
        this._id = id;
        this._discountCode = discountCode;
        this._discountPrice = discountPrice;
    }
    get id(): number {
        return this._id;
    }

    get discountCode(): string {
        return this._discountCode;
    }
    get discountPrice(): number {
        return this._discountPrice;
    }
}
