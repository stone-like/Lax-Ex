import { orderType } from "../../repository/order/OrderType";
import { Address } from "../../entity/Address";
import { convertAddressObjToEntity } from "../address/addressDTO";
import { ConvertCartItemsToEntityList } from "../cart/ConvertCartItemEntity";
import { Order } from "../../entity/Order";
import { convertProductListObjToEntityList } from "../product/productDTO";
import { convertBuyProductListToEntityList } from "../buyproduct/buyProductDTO";

export const convertOrderToEntity = (order: orderType) => {
    const addressEntity = convertAddressObjToEntity(order.address);
    const buyProductEntityList = convertBuyProductListToEntityList(
        order.buyProductList
    );

    return new Order(
        order.id,
        order.subtotal,
        order.discount,
        order.shipping_fee,
        order.tax,
        order.total,
        addressEntity,
        buyProductEntityList,
        order.created_at,
        order.shipped_at,
        order.order_status
    );
};

export const convertOrderListToEntityList = (orderList: orderType[]) => {
    if (orderList.length === 0) {
        return [];
    }
    const orderEntityList = orderList.map(order => {
        return convertOrderToEntity(order);
    });
    return orderEntityList;
};
