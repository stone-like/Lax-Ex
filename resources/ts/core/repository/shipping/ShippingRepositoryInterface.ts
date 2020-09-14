import { Result } from "../../../util/ErrorObject";
import { Shipping } from "../../entity/Shipping";
import { shippingErrorType } from "../../error/shipping/shippingErrorType";
import {
    shippingEntityListType,
    shippingListWithDefaultValueType,
    shippingInfoArrayFromBackEndType
} from "./ShippingType";
import { Cart } from "../../entity/Cart";

export interface ShippingRepositoryInterface {
    createShipping(
        name: string,
        price: number
    ): Promise<Result<boolean, shippingErrorType>>;
    updateShipping(
        shippingId: number,
        name: string,
        price: number
    ): Promise<Result<boolean, shippingErrorType>>;
    deleteShipping(
        shippingId: number
    ): Promise<Result<boolean, shippingErrorType>>;
    setShippingFee(
        shippingId: number
    ): Promise<Result<Cart, shippingErrorType>>;
    searchByName(
        name: string
    ): Promise<Result<shippingEntityListType, unknown>>;
    getAllShipping(): Promise<shippingListWithDefaultValueType>;
    getAllShippingForUser(): Promise<shippingListWithDefaultValueType>;
}
