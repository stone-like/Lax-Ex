import { CartRepositoryInterface } from "./CartRepositoryInterface";
import { Result, Failure, Success } from "../../../util/ErrorObject";
import { cartErrorType } from "../../error/cart/cartErrorType";
import { CartItem } from "../../entity/CartItem";
import axios from "axios";
import { getCartFromBackEndType, optionsType } from "./CartType";
import { Cart } from "../../entity/Cart";
import { ConvertCartItemsToEntityList } from "../../dto/cart/ConvertCartItemEntity";

export class CartLaravel implements CartRepositoryInterface {
    async addCartList(
        productId: number,
        quantity: number,
        options: optionsType
    ): Promise<Result<Cart, cartErrorType>> {
        try {
            const res: getCartFromBackEndType = await axios.post("/api/carts", {
                product_id: productId,
                quantity,
                options
            });
            const cartEntity: Cart = new Cart(
                res.data.cartSubTotal,
                res.data.cartCount,
                res.data.tax,
                res.data.discount,
                res.data.shippingFee,
                res.data.total,
                ConvertCartItemsToEntityList(res.data.cartItems)
            );
            return new Success(cartEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async updateCartList(
        rowId: string,
        quantity: number
    ): Promise<Result<Cart, cartErrorType>> {
        try {
            const res: getCartFromBackEndType = await axios.patch(
                "/api/carts",
                {
                    rowId,
                    quantity
                }
            );
            const cartEntity: Cart = new Cart(
                res.data.cartSubTotal,
                res.data.cartCount,
                res.data.tax,
                res.data.discount,
                res.data.shippingFee,
                res.data.total,
                ConvertCartItemsToEntityList(res.data.cartItems)
            );
            return new Success(cartEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async removeCartList(rowId: string): Promise<Result<Cart, cartErrorType>> {
        try {
            const res: getCartFromBackEndType = await axios.post(
                "/api/removecarts",
                {
                    rowId
                }
            );
            const cartEntity: Cart = new Cart(
                res.data.cartSubTotal,
                res.data.cartCount,
                res.data.tax,
                res.data.discount,
                res.data.shippingFee,
                res.data.total,
                ConvertCartItemsToEntityList(res.data.cartItems)
            );
            return new Success(cartEntity);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async clearCartList() {
        await axios.delete("/api/clearcart");
    }
    async getCart(): Promise<Cart> {
        const res: getCartFromBackEndType = await axios.get("/api/carts");
        const cartEntity: Cart = new Cart(
            res.data.cartSubTotal,
            res.data.cartCount,
            res.data.tax,
            res.data.discount,
            res.data.shippingFee,
            res.data.total,
            ConvertCartItemsToEntityList(res.data.cartItems)
        );

        return cartEntity;
    }
}
