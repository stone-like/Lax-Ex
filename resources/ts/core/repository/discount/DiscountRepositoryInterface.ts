import { Result } from "../../../util/ErrorObject";
import { Discount } from "../../entity/Discount";
import { discountErrorType } from "../../error/discount/discountErrorType";
import { discountEntityListType } from "./DiscountType";
import { Cart } from "../../entity/Cart";

export interface DiscountRepositoryInterface {
    createDiscount(
        discountCode: string,
        discountPrice: number
    ): Promise<Result<boolean, discountErrorType>>;
    deleteDiscount(
        discountId: number
    ): Promise<Result<boolean, discountErrorType>>;
    searchByName(
        name: string
    ): Promise<Result<discountEntityListType, unknown>>;
    getAllDiscount(): Promise<discountEntityListType>;
    setDiscount(discountCode: string): Promise<Result<Cart, discountErrorType>>;
}
