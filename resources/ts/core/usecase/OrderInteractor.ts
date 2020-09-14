import { OrderRepositoryInterface } from "../repository/order/OrderRepositoryInterface";
import { orderEntityList } from "../repository/order/OrderType";
import { Result } from "../../util/ErrorObject";
import { orderErrorType } from "../error/order/orderErrorType";

export class OrderInteractor {
    private OrderRepository: OrderRepositoryInterface;

    constructor(OrderRepository: OrderRepositoryInterface) {
        this.OrderRepository = OrderRepository;
    }

    async getUserOrder(): Promise<orderEntityList> {
        const res = await this.OrderRepository.getUserOrder();
        return res;
    }
    async getAllOrder(): Promise<orderEntityList> {
        const res = await this.OrderRepository.getAllOrder();
        return res;
    }
    async updateOrder(
        orderId: number,
        orderStatusId: number
    ): Promise<Result<boolean, orderErrorType>> {
        const res = await this.OrderRepository.updateOrder(
            orderId,
            orderStatusId
        );
        return res;
    }

    async findOrderByOrderStatusId(
        orderStatusId: number
    ): Promise<Result<orderEntityList, orderErrorType>> {
        const res = await this.OrderRepository.findOrderByOrderStatusId(
            orderStatusId
        );
        return res;
    }
}
