import { orderEntityList } from "./OrderType";
import { Result } from "../../../util/ErrorObject";
import { orderErrorType } from "../../error/order/orderErrorType";

export interface OrderRepositoryInterface {
    getUserOrder(): Promise<orderEntityList>;
    getAllOrder(): Promise<orderEntityList>;
    updateOrder(
        orderId: number,
        orderStatusId: number
    ): Promise<Result<boolean, orderErrorType>>;

    findOrderByOrderStatusId(
        orderStatusId: number
    ): Promise<Result<orderEntityList, orderErrorType>>;
}
