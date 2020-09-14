import { Result, Success, Failure } from "../../../util/ErrorObject";

import axios from "axios";
import {
    shippingEntityListType,
    shippingListFromBackEndType,
    shippingFromBackEndType,
    shippingType,
    shippingListWithDefaultValueType,
    shippingInfoArrayFromBackEndType
} from "./ShippingType";
import { shippingErrorType } from "../../error/shipping/shippingErrorType";
import { ShippingRepositoryInterface } from "./ShippingRepositoryInterface";
import { Shipping } from "../../entity/Shipping";
import {
    shippingListWithDefaultValue,
    shippingListToEntityList
} from "../../dto/shipping/shippingDTO";
import { Cart } from "../../entity/Cart";
import { getCartFromBackEndType } from "../cart/CartType";
import { ConvertCartItemsToEntityList } from "../../dto/cart/ConvertCartItemEntity";

export class ShippingLaravel implements ShippingRepositoryInterface {
    async createShipping(
        name: string,
        price: number
    ): Promise<Result<boolean, shippingErrorType>> {
        try {
            await axios.post("/api/admin/shippings", {
                name,
                price
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async updateShipping(
        shippingId: number,
        name: string,
        price: number
    ): Promise<Result<boolean, shippingErrorType>> {
        try {
            await axios.patch(`/api/admin/shippings/${shippingId}`, {
                name,
                price
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async deleteShipping(
        shippingId: number
    ): Promise<Result<boolean, shippingErrorType>> {
        try {
            await axios.delete(`/api/admin/shippings/${shippingId}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async setShippingFee(
        shippingId: number
    ): Promise<Result<Cart, shippingErrorType>> {
        try {
            const res: getCartFromBackEndType = await axios.post(
                `/api/cartShippings`,
                {
                    shipping_id: shippingId
                }
            );
            console.log(res);
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
    ): Promise<Result<shippingEntityListType, unknown>> {
        try {
            const shippingList: shippingListFromBackEndType = await axios.post(
                "/api/admin/shippings/searchByName",
                {
                    name
                }
            );

            const shippingEntityList = shippingList.data.map(
                (shipping: shippingType) => {
                    return new Shipping(
                        shipping.id,
                        shipping.name,
                        shipping.price
                    );
                }
            );
            return new Success(shippingEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async getAllShipping(): Promise<shippingListWithDefaultValueType> {
        const shippingList: shippingListFromBackEndType = await axios.get(
            "/api/admin/shippings"
        );

        const res = shippingListWithDefaultValue(shippingList);
        return res;
    }
    async getAllShippingForUser(): Promise<shippingListWithDefaultValueType> {
        const shippingInfoArray: shippingInfoArrayFromBackEndType = await axios.get(
            "/api/shippings"
        );
        const res = shippingListToEntityList(shippingInfoArray);
        return res;
    }
}
