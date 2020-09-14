import { OrderStatusRepositoryInterface } from "../repository/orderStatus/OrderStatusRepositoryInterface";
import { orderStatusEntityList } from "../repository/orderStatus/OrderStatusType";
import { Result } from "../../util/ErrorObject";
import { orderStatusErrorType } from "../error/orderStatus/orderStatusErrorType";

export class OrderStatusInteractor {
    private orderStatusRepository: OrderStatusRepositoryInterface;
    constructor(orderStatusRepository: OrderStatusRepositoryInterface) {
        this.orderStatusRepository = orderStatusRepository;
    }

    async getAllOrderStatus(): Promise<orderStatusEntityList> {
        const res = await this.orderStatusRepository.getAllOrderStatus();
        return res;
    }

    async createOrderStatus(
        name: string
    ): Promise<Result<boolean, orderStatusErrorType>> {
        const res = await this.orderStatusRepository.createOrderStatus(name);
        return res;
    }

    async deleteOrderStatus(
        orderStatusId: number
    ): Promise<Result<boolean, orderStatusErrorType>> {
        const res = await this.orderStatusRepository.deleteOrderStatus(
            orderStatusId
        );
        return res;
    }
    async searchByName(
        name: string
    ): Promise<Result<orderStatusEntityList, unknown>> {
        const res = await this.orderStatusRepository.searchByName(name);
        return res;
    }
}
