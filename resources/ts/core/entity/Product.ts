import { productImageListType } from "../repository/product/ProductType";

export class Product {
    private _id: number;
    private _name: string;
    private _slug: string;
    private _categoryId: number;
    private _quantity: number;
    private _price: number;
    private _weight: number;
    private _status: string;
    private _description: string;
    private _images: productImageListType;

    constructor(
        id: number,
        name: string,
        slug: string,
        categoryId: number,
        quantity: number,
        price: number,
        weight: number,
        status: string,
        description: string = "",
        images: productImageListType = []
    ) {
        this._id = id;
        this._categoryId = categoryId;
        this._description = description;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._slug = slug;
        this._status = status;
        this._weight = weight;
        this._images = images;
    }

    get id(): number {
        return this._id;
    }

    get categoryId(): number {
        return this._categoryId;
    }

    get description(): string {
        return this._description;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }

    get slug(): string {
        return this._slug;
    }

    get status(): string {
        return this._status;
    }

    get weight(): number {
        return this._weight;
    }

    get images(): productImageListType {
        return this._images;
    }
}
