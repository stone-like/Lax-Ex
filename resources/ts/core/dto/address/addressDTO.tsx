import {
    addressType,
    addressFromBackEndType,
    addressListFromBackEndType,
    changeAddressFromBackEndType,
    changeAddressType
} from "../../repository/address/AddressType";
import { Address } from "../../entity/Address";

export const convertPrefectureIdToString = (prefectureId: number) => {
    return prefectureId.toString();
};
export const convertPrefectureIdToInt = (prefectureId: string) => {
    return Number(prefectureId);
};

export const convertAddressObjToEntity = (
    addressObj: addressType
): Address | null => {
    if (addressObj === null) {
        return null;
    }

    const addressEntity = new Address(
        addressObj.id,
        addressObj.zip,
        addressObj.address1,
        addressObj.userName,
        addressObj.prefectureName,
        addressObj.address2,
        addressObj.phoneNumber
    );
    return addressEntity;
};
export const convertAddressListObjToEntity = (
    addressListObj: addressType[]
): Address[] => {
    if (addressListObj.length === 0) {
        return [];
    }
    const addressEntityList = addressListObj.map(address => {
        return new Address(
            address.id,
            address.zip,
            address.address1,
            address.userName,
            address.prefectureName,
            address.address2,
            address.phoneNumber
        );
    });
    return addressEntityList;
};
export const convertToDefaultAddressEntityAndOthersEntityList = (
    res: changeAddressFromBackEndType
): changeAddressType => {
    const defaultAddress = convertAddressObjToEntity(res.data.defaultAddress);
    const otherAddresses = convertAddressListObjToEntity(
        res.data.otherAddresses
    );
    return {
        defaultAddress,
        otherAddresses
    };
};
