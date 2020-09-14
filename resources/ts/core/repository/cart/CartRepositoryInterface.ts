import { Result } from "../../../util/ErrorObject";
import { cartErrorType } from "../../error/cart/cartErrorType";
import { Cart } from "../../entity/Cart";
import { optionsType } from "./CartType";

export interface CartRepositoryInterface {
    addCartList(
        productId: number,
        quantity: number,
        options: optionsType
    ): Promise<Result<Cart, cartErrorType>>;
    updateCartList(
        rowId: string,
        quantity: number
    ): Promise<Result<Cart, cartErrorType>>;
    removeCartList(rowId: string): Promise<Result<Cart, cartErrorType>>;
    clearCartList(): void;
    getCart(): Promise<Cart>;
}
