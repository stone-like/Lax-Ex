import { orderStatusType } from "../../repository/orderStatus/OrderStatusType";
import { OrderStatus } from "../../entity/OrderStatus";

//この二つ、というかこの二つの形はgenericsにしてしまってもいいかも
export const convertOrderStatusToEntity = (orderStatus: orderStatusType) => {
    const orderStatusEntity = new OrderStatus(orderStatus.id, orderStatus.name);
    return orderStatusEntity;
};
export const convertOrderStatusListToEntityList = (
    orderStatusList: orderStatusType[]
) => {
    const orderStatusEntityList = orderStatusList.map(orderStatus => {
        return convertOrderStatusToEntity(orderStatus);
    });
    return orderStatusEntityList;
};
