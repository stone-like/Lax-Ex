import { OrderStatus } from "../../entity/OrderStatus";

export type orderStatusType = {
    id: number;
    name: string;
};
export type orderStatusFromBackEndType = {
    data: orderStatusType;
};
export type orderStatusListFromBackEndType = {
    data: orderStatusType[];
};
export type orderStatusEntityList = OrderStatus[];
