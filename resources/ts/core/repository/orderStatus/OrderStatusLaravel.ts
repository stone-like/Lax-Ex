import { OrderStatusRepositoryInterface } from "./OrderStatusRepositoryInterface";
import axios from "axios";
import {
    orderStatusEntityList,
    orderStatusListFromBackEndType
} from "./OrderStatusType";
import { convertOrderStatusListToEntityList } from "../../dto/orderStatus/orderStatusDTO";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { orderStatusErrorType } from "../../error/orderStatus/orderStatusErrorType";

export class OrderStatusLaravel implements OrderStatusRepositoryInterface {
    async getAllOrderStatus(): Promise<orderStatusEntityList> {
        const res: orderStatusListFromBackEndType = await axios.get(
            "/api/admin/orderStatuses"
        );
        const orderStatusEntityList = convertOrderStatusListToEntityList(
            res.data
        );
        return orderStatusEntityList;
    }

    async createOrderStatus(
        name: string
    ): Promise<Result<boolean, orderStatusErrorType>> {
        try {
            await axios.post("/api/admin/orderStatuses", {
                name
            });
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async deleteOrderStatus(
        orderStatusId: number
    ): Promise<Result<boolean, orderStatusErrorType>> {
        try {
            await axios.delete(`/api/admin/orderStatuses/${orderStatusId}`);
            return new Success(true);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }

    async searchByName(
        name: string
    ): Promise<Result<orderStatusEntityList, unknown>> {
        try {
            const res: orderStatusListFromBackEndType = await axios.post(
                "/api/admin/orderStatuses/searchByName",
                { name }
            );
            const orderStatusEntityList = convertOrderStatusListToEntityList(
                res.data
            );
            return new Success(orderStatusEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
}
