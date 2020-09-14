import { Result } from "../../util/ErrorObject";
import { discountErrorType } from "../error/discount/discountErrorType";
import { discountEntityListType } from "../repository/discount/DiscountType";
import { DiscountRepositoryInterface } from "../repository/discount/DiscountRepositoryInterface";
import { Cart } from "../entity/Cart";

export class DiscountInteractor {
    private DiscountRepository: DiscountRepositoryInterface;

    constructor(DiscountRepository: DiscountRepositoryInterface) {
        this.DiscountRepository = DiscountRepository;
    }
    async createDiscount(
        discountCode: string,
        discountPrice: number
    ): Promise<Result<boolean, discountErrorType>> {
        const res = await this.DiscountRepository.createDiscount(
            discountCode,
            discountPrice
        );
        return res;
    }
    async deleteDiscount(
        discountId: number
    ): Promise<Result<boolean, discountErrorType>> {
        const res = await this.DiscountRepository.deleteDiscount(discountId);
        return res;
    }

    //完全一致でなければ[]が返る
    async searchByName(
        name: string
    ): Promise<Result<discountEntityListType, unknown>> {
        const res = await this.DiscountRepository.searchByName(name);
        return res;
    }
    async getAllDiscount(): Promise<discountEntityListType> {
        const res = await this.DiscountRepository.getAllDiscount();
        return res;
    }
    async setDiscount(
        discountCode: string
    ): Promise<Result<Cart, discountErrorType>> {
        const res = await this.DiscountRepository.setDiscount(discountCode);
        return res;
    }
}
