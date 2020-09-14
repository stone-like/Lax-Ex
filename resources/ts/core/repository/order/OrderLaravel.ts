import { OrderRepositoryInterface } from "./OrderRepositoryInterface";
import { orderEntityList, orderListFromBackEndType } from "./OrderType";
import axios from "axios";
import { convertOrderListToEntityList } from "../../dto/order/orderDTO";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { orderErrorType } from "../../error/order/orderErrorType";
export class OrderLaravel implements OrderRepositoryInterface {
    //toDo:Userにも過去三か月以内とか検索条件を付けてあげる
    async getUserOrder(): Promise<orderEntityList> {
        const res: orderListFromBackEndType = await axios.get("/api/orders");
        const orderEntityList = convertOrderListToEntityList(res.data);
        return orderEntityList;
    }
    async getAllOrder(): Promise<orderEntityList> {
        const res: orderListFromBackEndType = await axios.get(
            "/api/admin/orders"
        );
        const orderEntityList = convertOrderListToEntityList(res.data);
        return orderEntityList;
    }
    async updateOrder(
        orderId: number,
        orderStatusId: number
    ): Promise<Result<boolean, orderErrorType>> {
        try {
            await axios.patch(`/api/admin/orders/${orderId}`, {
                order_status_id: orderStatusId
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async findOrderByOrderStatusId(
        orderStatusId: number
    ): Promise<Result<orderEntityList, orderErrorType>> {
        try {
            const res: orderListFromBackEndType = await axios.post(
                `/api/admin/orders/findByOrderStatus`,
                {
                    order_status_id: orderStatusId
                }
            );
            const orderEntityList = convertOrderListToEntityList(res.data);

            return new Success(orderEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
}
