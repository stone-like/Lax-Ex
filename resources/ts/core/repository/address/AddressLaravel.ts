import {
    addressInputType,
    addressEntityList,
    addressFromBackEndType,
    addressListFromBackEndType,
    changeAddressType,
    changeAddressFromBackEndType
} from "./AddressType";
import { Result, Success, Failure } from "../../../util/ErrorObject";
import { Address } from "../../entity/Address";
import { addressErrorType } from "../../error/address/addressErrorType";
import axios from "axios";
import {
    convertPrefectureIdToInt,
    convertPrefectureIdToString,
    convertToDefaultAddressEntityAndOthersEntityList,
    convertAddressObjToEntity,
    convertAddressListObjToEntity
} from "../../dto/address/addressDTO";

export class AddressLaravel {
    //addressかnullを返すってなんだか筋が悪い気がしてしまうが・・・ただ、defaultAddressが無い状態も別にエラーではないしどうにかうまい手段を見つけたい
    async createAddress(
        addressObj: addressInputType
    ): Promise<Result<Address | null, addressErrorType>> {
        //prefecture_idの変換はすべてRepository層で統一でいい？少なくともどこか一つの場所に揃えないとわかりづらいと思う
        //なので今回はここでfront→back(string→int),back→frontはPrefectureNameが帰ってくるので関係ない
        try {
            const res: addressFromBackEndType = await axios.post(
                "/api/addresses",
                {
                    zip: addressObj.zip,
                    address1: addressObj.address1,
                    address2: addressObj.address2,
                    phoneNumber: addressObj.phoneNumber,
                    userName: addressObj.userName,
                    prefecture_id: convertPrefectureIdToInt(
                        addressObj.prefecture_id
                    )
                }
            );
            const addressEntity = convertAddressObjToEntity(res.data);
            return new Success(addressEntity);
        } catch (error) {
            console.log(error.response.data);
            return new Failure(error.response.data.errors);
        }
    }
    async addNewAddress(
        addressObj: addressInputType
    ): Promise<Result<addressEntityList, addressErrorType>> {
        try {
            const res: addressListFromBackEndType = await axios.post(
                "/api/newaddresses",
                {
                    zip: addressObj.zip,
                    address1: addressObj.address1,
                    address2: addressObj.address2,
                    phoneNumber: addressObj.phoneNumber,
                    userName: addressObj.userName,
                    prefecture_id: convertPrefectureIdToInt(
                        addressObj.prefecture_id
                    )
                }
            );
            const addressEntityList = convertAddressListObjToEntity(res.data);
            return new Success(addressEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    } //default以外のaddressが変化する

    //defaultAddressは削除できないようにしている,なのでdefault以外が変化する
    async deleteAddress(
        addressId: number
    ): Promise<Result<addressEntityList, addressErrorType>> {
        try {
            const res: addressListFromBackEndType = await axios.delete(
                `/api/addresses/${addressId}`
            );
            const addressEntityList = convertAddressListObjToEntity(res.data);
            return new Success(addressEntityList);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async changeDefaultAddress(
        addressId: number
    ): Promise<Result<changeAddressType, addressErrorType>> {
        try {
            const res: changeAddressFromBackEndType = await axios.post(
                "/api/changeaddresses",
                {
                    address_id: addressId
                }
            );

            const defaultAndOtherAddresses = convertToDefaultAddressEntityAndOthersEntityList(
                res
            );
            return new Success(defaultAndOtherAddresses);
        } catch (error) {
            return new Failure(error.response.data.errors);
        }
    }
    async getDefaultAddress(): Promise<Address | null> {
        const res: addressFromBackEndType = await axios.get("/api/addresses");
        const addressEntity = convertAddressObjToEntity(res.data);
        return addressEntity;
    }
    async getAllAddressExceptDefault(): Promise<addressEntityList> {
        const res: addressListFromBackEndType = await axios.get(
            "/api/alladdresses"
        );
        const addressEntityList = convertAddressListObjToEntity(res.data);
        return addressEntityList;
    }
}
