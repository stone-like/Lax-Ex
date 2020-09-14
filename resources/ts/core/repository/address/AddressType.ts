import { Address } from "../../entity/Address";

export type addressInputType = {
    zip: string;
    address1: string;
    address2?: string;
    prefecture_id: string;
    userName: string;
    phoneNumber?: string;
};

export type addressType = {
    id: number;
    zip: string;
    address1: string;
    address2?: string;
    prefectureName: string;
    userName: string;
    phoneNumber?: string;
};
export type addressFromBackEndType = {
    data: addressType | null;
};

export type addressListFromBackEndType = {
    data: addressType[];
};

export type changeAddressFromBackEndType = {
    data: {
        defaultAddress: addressType | null;
        otherAddresses: addressType[];
    };
};

export type changeAddressType = {
    defaultAddress: Address | null;
    otherAddresses: Address[];
};
export type addressEntityList = Address[];
