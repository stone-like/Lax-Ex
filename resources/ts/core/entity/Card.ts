export class Card {
    private _cardlast4: string;
    private _brand: string;
    private _exp_month: number;
    private _exp_year: number;
    private _name: string;

    constructor(
        cardlast4: string,
        brand: string,
        exp_month: number,
        exp_year: number,
        name: string
    ) {
        this._cardlast4 = cardlast4;
        this._brand = brand;
        this._exp_month = exp_month;
        this._exp_year = exp_year;
        this._name = name;
    }

    get cardlast4(): string {
        return this._cardlast4;
    }
    get brand(): string {
        return this._brand;
    }
    get exp_month(): number {
        return this._exp_month;
    }
    get exp_year(): number {
        return this._exp_year;
    }
    get name(): string {
        return this._name;
    }
}
