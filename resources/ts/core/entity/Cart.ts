import { CartItem } from "./CartItem";

export class Cart {
    private _cartSubTotal: string;
    private _cartCount: number;
    private _tax: string;
    private _discount: string;
    private _shippingFee: number;
    private _total: string;
    private _cartItems: CartItem[];

    constructor(
        cartSubTotal: string,
        cartCount: number,
        tax: string,
        discount: string,
        shippingFee: number,
        total: string,
        cartItems: CartItem[]
    ) {
        this._cartCount = cartCount;
        this._cartSubTotal = cartSubTotal;
        this._tax = tax;
        this._discount = discount;
        this._shippingFee = shippingFee;
        this._total = total;
        this._cartItems = cartItems;
    }

    get cartCount(): number {
        return this._cartCount;
    }

    get cartSubTotal(): string {
        return this._cartSubTotal;
    }

    get tax(): string {
        return this._tax;
    }
    get discount(): string {
        return this._discount;
    }
    get shippingFee(): number {
        return this._shippingFee;
    }
    get total(): string {
        return this._total;
    }
    get cartItems(): CartItem[] {
        return this._cartItems;
    }
}
