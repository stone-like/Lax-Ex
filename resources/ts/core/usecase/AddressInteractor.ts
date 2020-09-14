import { AddressRepositoryInterface } from "../repository/address/AddressRepositoryInterface";
import {
    addressInputType,
    addressEntityList,
    changeAddressType
} from "../repository/address/AddressType";
import { Result } from "../../util/ErrorObject";
import { Address } from "../entity/Address";
import { addressErrorType } from "../error/address/addressErrorType";

export class AddressInteractor {
    private AddressRepository: AddressRepositoryInterface;

    constructor(AddressRepository: AddressRepositoryInterface) {
        this.AddressRepository = AddressRepository;
    }
    async createAddress(
        addressObj: addressInputType
    ): Promise<Result<Address | null, addressErrorType>> {
        const res = await this.AddressRepository.createAddress(addressObj);
        return res;
    }
    async addNewAddress(
        addressObj: addressInputType
    ): Promise<Result<addressEntityList, addressErrorType>> {
        const res = await this.AddressRepository.addNewAddress(addressObj);
        return res;
    } //default以外のaddressが変化する
    async deleteAddress(
        addressId: number
    ): Promise<Result<addressEntityList, addressErrorType>> {
        const res = await this.AddressRepository.deleteAddress(addressId);
        return res;
    }
    async changeDefaultAddress(
        addressId: number
    ): Promise<Result<changeAddressType, addressErrorType>> {
        const res = await this.AddressRepository.changeDefaultAddress(
            addressId
        );
        return res;
    }
    async getDefaultAddress(): Promise<Address | null> {
        const res = await this.AddressRepository.getDefaultAddress();
        return res;
    }
    async getAllAddressExceptDefault(): Promise<addressEntityList> {
        const res = await this.AddressRepository.getAllAddressExceptDefault();
        return res;
    }
}
