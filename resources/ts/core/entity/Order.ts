import { Address } from "./Address";
import { productEntityListType } from "../repository/product/ProductType";
import { CartItem } from "./CartItem";
import { Product } from "./Product";
import { BuyProduct } from "./BuyProduct";

//orderにはcreatedatと、注文確定日時(admin側でsorderStatusをshippedに変えた時)がいる
export class Order {
    private _id: number;
    private _subtotal: string;
    private _discount: string;
    private _shipping_fee: number;
    private _tax: string;
    private _total: string;
    private _address: Address;
    private _buyProductList: BuyProduct[];
    private _created_at: string;
    private _shipped_at: string;
    private _order_status: string;

    constructor(
        id: number,
        subtotal: string,
        discount: string,
        shipping_fee: number,
        tax: string,
        total: string,
        address: Address,
        buyProductList: BuyProduct[],
        created_at: string,
        shipped_at: string,
        order_status: string
    ) {
        this._id = id;
        this._address = address;
        this._subtotal = subtotal;
        this._discount = discount;
        this._tax = tax;
        this._shipping_fee = shipping_fee;
        this._buyProductList = buyProductList;
        this._total = total;
        this._created_at = created_at;
        this._shipped_at = shipped_at;
        this._order_status = order_status;
    }

    get id(): number {
        return this._id;
    }

    get address(): Address {
        return this._address;
    }
    get subtotal(): string {
        return this._subtotal;
    }
    get discount(): string {
        return this._discount;
    }
    get tax(): string {
        return this._tax;
    }
    get shipping_fee(): number {
        return this._shipping_fee;
    }
    get buyProductList(): BuyProduct[] {
        return this._buyProductList;
    }
    get total(): string {
        return this._total;
    }
    get created_at(): string {
        return this._created_at;
    }
    get shipped_at(): string {
        return this._shipped_at;
    }
    get order_status(): string {
        return this._order_status;
    }
}
