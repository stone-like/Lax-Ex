import {
    shippingListFromBackEndType,
    shippingListWithDefaultValueType,
    shippingType,
    shippingInfoArrayFromBackEndType
} from "../../repository/shipping/ShippingType";
import { Shipping } from "../../entity/Shipping";

export const shippingListWithDefaultValue = (
    shippingList: shippingListFromBackEndType
): shippingListWithDefaultValueType => {
    const shippingEntityList = shippingList.data.map(
        (shipping: shippingType) => {
            return new Shipping(shipping.id, shipping.name, shipping.price);
        }
    );
    const defaultValue = shippingEntityList[0].id;

    return {
        shippingList: shippingEntityList,
        defaultValue
    };
};

export const shippingListToEntityList = (
    shippingInfoArray: shippingInfoArrayFromBackEndType
): shippingListWithDefaultValueType => {
    const shippingEntityList = shippingInfoArray.data.shippingList.map(
        (shipping: shippingType) => {
            return new Shipping(shipping.id, shipping.name, shipping.price);
        }
    );

    return {
        shippingList: shippingEntityList,
        defaultValue: shippingInfoArray.data.defaultValue
    };
};
