import {
    addressInputType,
    addressEntityList,
    changeAddressType
} from "./AddressType";
import { addressErrorType } from "../../error/address/addressErrorType";
import { Address } from "../../entity/Address";
import { Result } from "../../../util/ErrorObject";

export interface AddressRepositoryInterface {
    createAddress(
        addressObj: addressInputType
    ): Promise<Result<Address | null, addressErrorType>>;
    addNewAddress(
        addressObj: addressInputType
    ): Promise<Result<addressEntityList, addressErrorType>>; //default以外のaddressが変化する
    deleteAddress(
        addressId: number
    ): Promise<Result<addressEntityList, addressErrorType>>;
    getDefaultAddress(): Promise<Address | null>;
    getAllAddressExceptDefault(): Promise<addressEntityList>; //Promise<addressEntityList\[]>
    changeDefaultAddress(
        addressId: number
    ): Promise<Result<changeAddressType, addressErrorType>>;
}
