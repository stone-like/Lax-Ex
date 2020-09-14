import { Result } from "../../util/ErrorObject";
import { shippingErrorType } from "../error/shipping/shippingErrorType";
import {
    shippingEntityListType,
    shippingListWithDefaultValueType,
    shippingInfoArrayFromBackEndType
} from "../repository/shipping/ShippingType";
import { ShippingRepositoryInterface } from "../repository/shipping/ShippingRepositoryInterface";
import { Cart } from "../entity/Cart";

export class ShippingInteractor {
    private ShippingRepository: ShippingRepositoryInterface;

    constructor(ShippingRepository: ShippingRepositoryInterface) {
        this.ShippingRepository = ShippingRepository;
    }
    async createShipping(
        name: string,
        price: number
    ): Promise<Result<boolean, shippingErrorType>> {
        const res = await this.ShippingRepository.createShipping(name, price);
        return res;
    }
    async updateShipping(
        shippingId: number,
        name: string,
        price: number
    ): Promise<Result<boolean, shippingErrorType>> {
        const res = await this.ShippingRepository.updateShipping(
            shippingId,
            name,
            price
        );
        return res;
    }
    async deleteShipping(
        shippingId: number
    ): Promise<Result<boolean, shippingErrorType>> {
        const res = await this.ShippingRepository.deleteShipping(shippingId);
        return res;
    }
    async setShippingFee(
        shippingId: number
    ): Promise<Result<Cart, shippingErrorType>> {
        const res = await this.ShippingRepository.setShippingFee(shippingId);
        return res;
    }

    //完全一致でなければ[]が返る
    async searchByName(
        name: string
    ): Promise<Result<shippingEntityListType, unknown>> {
        const res = await this.ShippingRepository.searchByName(name);
        return res;
    }
    async getAllShipping(): Promise<shippingListWithDefaultValueType> {
        const res = await this.ShippingRepository.getAllShipping();
        return res;
    }
    async getAllShippingForUser(): Promise<shippingListWithDefaultValueType> {
        const res = await this.ShippingRepository.getAllShippingForUser();
        return res;
    }
}
