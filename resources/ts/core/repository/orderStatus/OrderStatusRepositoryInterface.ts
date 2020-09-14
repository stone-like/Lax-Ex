import { orderStatusEntityList } from "./OrderStatusType";
import { Result } from "../../../util/ErrorObject";
import { orderStatusErrorType } from "../../error/orderStatus/orderStatusErrorType";

export interface OrderStatusRepositoryInterface {
    getAllOrderStatus(): Promise<orderStatusEntityList>;
    createOrderStatus(
        name: string
    ): Promise<Result<boolean, orderStatusErrorType>>;
    deleteOrderStatus(
        orderStatusId: number
    ): Promise<Result<boolean, orderStatusErrorType>>;
    searchByName(name: string): Promise<Result<orderStatusEntityList, unknown>>;
}
