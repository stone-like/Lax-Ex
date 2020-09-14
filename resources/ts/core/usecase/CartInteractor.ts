import { CartRepositoryInterface } from "../repository/cart/CartRepositoryInterface";
import { Result } from "../../util/ErrorObject";
import { cartErrorType } from "../error/cart/cartErrorType";
import { Cart } from "../entity/Cart";
import { optionsType } from "../repository/cart/CartType";

export class CartInteractor {
    private CartRepository: CartRepositoryInterface;

    constructor(CartRepository: CartRepositoryInterface) {
        this.CartRepository = CartRepository;
    }

    async addCartList(
        productId: number,
        quantity: number,
        options: optionsType
    ): Promise<Result<Cart, cartErrorType>> {
        const res = await this.CartRepository.addCartList(
            productId,
            quantity,
            options
        );
        return res;
    }
    async updateCartList(
        rowId: string,
        quantity: number
    ): Promise<Result<Cart, cartErrorType>> {
        const res = await this.CartRepository.updateCartList(rowId, quantity);
        return res;
    }
    async removeCartList(rowId: string): Promise<Result<Cart, cartErrorType>> {
        const res = await this.CartRepository.removeCartList(rowId);
        return res;
    }
    async clearCartList() {
        await this.CartRepository.clearCartList();
    }
    async getCart(): Promise<Cart> {
        const res = await this.CartRepository.getCart();
        return res;
    }
}
