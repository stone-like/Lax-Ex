import { Result, Success, Failure } from "../../../util/ErrorObject";

import axios from "axios";
import {
    discountEntityListType,
    discountListFromBackEndType,
    discountFromBackEndType,
    discountType
} from "./DiscountType";
import { discountErrorType } from "../../error/discount/discountErrorType";
import { DiscountRepositoryInterface } from "./DiscountRepositoryInterface";
import { Discount } from "../../entity/Discount";
import { Cart } from "../../entity/Cart";
import { getCartFromBackEndType } from "../cart/CartType";
import { ConvertCartItemsToEntityList } from "../../dto/cart/ConvertCartItemEntity";

export class DiscountLaravel implements DiscountRepositoryInterface {
    async createDiscount(
        discountCode: string,
        discountPrice: number
    ): Promise<Result<boolean, discountErrorType>> {
        try {
            await axios.post("/api/admin/discounts", {
                discountCode,
                discountPrice
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async deleteDiscount(
        discountId: number
    ): Promise<Result<boolean, discountErrorType>> {
        try {
            await axios.delete(`/api/admin/discounts/${discountId}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async setDiscount(
        discountCode: string
    ): Promise<Result<Cart, discountErrorType>> {
        try {
            const res: getCartFromBackEndType = await axios.post(
                `/api/cartDiscounts`,
                {
                    discountCode: discountCode
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
    //こっちは完全一致じゃなくていい
    async searchByName(
        name: string
    ): Promise<Result<discountEntityListType, unknown>> {
        try {
            const discountList: discountListFromBackEndType = await axios.post(
                "/api/admin/discounts/searchByName",
                {
                    name
                }
            );

            const discountEntityList = discountList.data.map(
                (discount: discountType) => {
                    return new Discount(
                        discount.id,
                        discount.discountCode,
                        discount.discountPrice
                    );
                }
            );
            return new Success(discountEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async getAllDiscount(): Promise<discountEntityListType> {
        const discountList: discountListFromBackEndType = await axios.get(
            "/api/admin/discounts"
        );

        const discountEntityList = discountList.data.map(
            (discount: discountType) => {
                return new Discount(
                    discount.id,
                    discount.discountCode,
                    discount.discountPrice
                );
            }
        );
        return discountEntityList;
    }
}
