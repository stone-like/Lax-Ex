import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    addressFormType,
    addrReturnType
} from "../../ui/feature/checkout/checkOutAddressAndCard/form/addresstype";
import { Core as YubinBangoCore } from "yubinbango-core";
import { AddressLaravel } from "../../core/repository/address/AddressLaravel";
import { AddressInteractor } from "../../core/usecase/AddressInteractor";
import { Redirect } from "react-router-dom";
import { Address } from "../../core/entity/Address";
import { addressEntityList } from "../../core/repository/address/AddressType";
import styled from "styled-components";
import { prefectureEntityList } from "../../core/repository/prefecture/PrefectureType";
import {
    LabelContent,
    InputContainer,
    InputContent,
    CheckContainer
} from "../../ui/app/util/css/CustomInput";
import { BorderButton } from "../../ui/app/util/css/BorderButton";
import Color from "../../ui/app/util/css/Color";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { useAuthError } from "./useAuthError";
import { AddressInfo } from "../../ui/feature/checkout/addressInfo/AddressInfo";
import { OtherAddresses } from "../../ui/feature/checkout/checkOutAddressAndCard/OtherAddresses";
import { CustomLoader } from "../../ui/app/util/loader/CustomLoader";
import { customMedia } from "../../ui/app/util/css/Media";

type Props = {
    setDefaultAddress: React.Dispatch<React.SetStateAction<Address>>;
    setOtherAddresses: React.Dispatch<React.SetStateAction<addressEntityList>>;
    prefectureList: prefectureEntityList;
    isAddressLoaded: boolean;
    setIsAddressLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    defaultAddress: Address;
    otherAddresses: addressEntityList;
};
export const useAddress = (props: Props) => {
    const {
        setDefaultAddress,
        setOtherAddresses,
        prefectureList,
        isAddressLoaded,
        setIsAddressLoaded,
        defaultAddress,
        otherAddresses
    } = props;

    const [postCodeH, setPostCodeH] = useState("");
    const [postCodeE, setPostCodeE] = useState("");
    const [prefecture, setPrefecture] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const { withAbNormalAuthErrorHandler } = useAuthError("user");

    const repository = new AddressLaravel();
    const interactor = new AddressInteractor(repository);
    const {
        handleSubmit,
        register,
        errors,
        formState,
        getValues,
        setValue
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange"
    });

    //これuseStateの代わりにwatchをやれば賄えそうだけど

    const setValueHandler = (name: string, value: string) => {
        switch (name) {
            case "postCodeH":
                setPostCodeH(value);
                setValue("postCodeH", value);
                return;
            case "postCodeE":
                setPostCodeE(value);
                setValue("postCodeE", value);
                return;
            case "Prefecture":
                setPrefecture(value);
                setValue("Prefecture", value);
                return;
            case "Address1":
                setAddress1(value);
                setValue("Address1", value);
                return;
            case "Address2":
                setAddress2(value);
                setValue("Address2", value);
                return;
            case "Name":
                setName(value);
                setValue("Name", value);
                return;
            case "PhoneNumber":
                setPhoneNumber(value);
                setValue("PhoneNumber", value);
                return;
        }
    };

    const isDisabled = () => {
        return (
            postCodeH === "" ||
            errors.postCodeH ||
            postCodeE === "" ||
            errors.postCodeE ||
            prefecture === "" ||
            errors.Prefecture ||
            address1 === "" ||
            errors.Address1 ||
            name === "" ||
            errors.Name
        );
    };
    const changeHandler = async (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>,
        name: addressFormType
    ) => {
        const value = e.target.value;

        switch (name) {
            case "postCodeH":
                console.log("postH");
                return setValueHandler("postCodeH", value);
            case "postCodeE":
                console.log("postE");
                return setValueHandler("postCodeE", value);
            case "Prefecture":
                return setValueHandler("Prefecture", value);
            case "Address1":
                return setValueHandler("Address1", value);
            case "Address2":
                return setValueHandler("Address2", value);
            case "Name":
                return setValueHandler("Name", value);
            case "PhoneNumber":
                return setValueHandler("PhoneNumber", value);
        }
    };
    const AddressFillHandler = () => {
        const completeZip = postCodeH + "-" + postCodeE;
        if (completeZip.length < 7) {
            return;
        }

        const callBackFn = (addr: addrReturnType) => {
            setValueHandler("Prefecture", addr.region_id.toString());
            setValueHandler("Address1", addr.locality + addr.street);
            setValueHandler("Address2", addr.extended);
        };
        const res = new YubinBangoCore(completeZip, callBackFn);
        return;
    };
    const createAddressHandler = async () => {
        const zip = postCodeH + "-" + postCodeE;
        const res = await interactor.createAddress({
            zip: zip,
            address1: address1,
            prefecture_id: prefecture,
            userName: name,
            phoneNumber: phoneNumber,
            address2: address2
        });

        if (res.isFailure()) {
            return withAbNormalAuthErrorHandler(res.value);
        }

        setDefaultAddress(res.value);
    };
    const addAddressHandler = async () => {
        const zip = postCodeH + "-" + postCodeE;
        const res = await interactor.addNewAddress({
            zip: zip,
            address1: address1,
            prefecture_id: prefecture,
            userName: name,
            phoneNumber: phoneNumber,
            address2: address2
        });
        if (res.isFailure()) {
            return withAbNormalAuthErrorHandler(res.value);
        }
        setOtherAddresses(res.value);
    };
    const makeAddressHandler = async (createOrAdd: "create" | "add") => {
        //postCodeは***-****の形にしてbackへ
        if (createOrAdd == "create") {
            createAddressHandler();
            return;
        }
        addAddressHandler();
        return;
    };
    const displayIsChecked = (inputName: string) => {
        // console.log("prefecture", getValues("Prefecture"));
        switch (inputName) {
            case "postCodeH":
                return postCodeH === "" || errors.postCodeH ? (
                    ""
                ) : (
                    <AiOutlineCheckSquare />
                );
            case "postCodeE":
                return postCodeE === "" || errors.postCodeE ? (
                    ""
                ) : (
                    <AiOutlineCheckSquare />
                );
            case "Prefecture":
                return prefecture === "" || errors.Prefecture ? (
                    ""
                ) : (
                    <AiOutlineCheckSquare />
                );
            case "Address1":
                return address1 === "" || errors.Address1 ? (
                    ""
                ) : (
                    <AiOutlineCheckSquare />
                );
            case "Name":
                return name === "" || errors.Name ? (
                    ""
                ) : (
                    <AiOutlineCheckSquare />
                );
        }
    };

    const getAddresses = async () => {
        const addressRes = await interactor.getDefaultAddress();
        setDefaultAddress(addressRes);
        //defaultがnullの場合ほかのaddressも存在しないので
        if (addressRes === null) {
            setIsAddressLoaded(true);
            return;
        }

        const res = await interactor.getAllAddressExceptDefault();
        setOtherAddresses(res);
        setIsAddressLoaded(true);
    };

    useEffect(() => {
        setIsAddressLoaded(false);
        getAddresses();
    }, []);

    const commonForm = (createOrAdd: "create" | "add") => {
        return (
            <AllContainer>
                <AddressTitle>
                    {createOrAdd === "create"
                        ? "CreateNewAddress"
                        : "AddNewAddress"}
                </AddressTitle>
                <form>
                    <span style={{ display: "none" }}>Japan</span>

                    <ZipContainer>
                        <ZipMark>〒</ZipMark>
                        <InputContainer>
                            <InputContent
                                type="text"
                                size={3}
                                maxLength={3}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => changeHandler(e, "postCodeH")}
                                id="postCodeH"
                                name="postCodeH"
                                data-testid="postCodeH"
                                ref={register({
                                    required: "Required"
                                })}
                            />
                            <LabelContent
                                htmlFor="postCodeH"
                                value={postCodeH}
                                name="postCodeH"
                            >
                                PostCodeH
                            </LabelContent>
                            <CheckContainer>
                                {displayIsChecked("postCodeH")}
                            </CheckContainer>
                        </InputContainer>
                        <InputContainer>
                            <InputContent
                                type="text"
                                size={4}
                                maxLength={4}
                                onKeyUp={AddressFillHandler}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => changeHandler(e, "postCodeE")}
                                id="postCodeE"
                                name="postCodeE"
                                data-testid="postCodeE"
                                ref={register({
                                    required: "Required"
                                })}

                                // value={postCodeE}
                            />
                            <LabelContent
                                htmlFor="postCodeE"
                                value={postCodeE}
                                name="postCodeE"
                            >
                                PostCodeE
                            </LabelContent>
                            <CheckContainer>
                                {displayIsChecked("postCodeE")}
                            </CheckContainer>
                        </InputContainer>
                    </ZipContainer>
                    <SelectDiv>
                        <CustomSelect
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => changeHandler(e, "Prefecture")}
                            name="Prefecture"
                            ref={register({
                                required: "Required"
                            })}
                        >
                            <option hidden>select Prefecture</option>
                            {prefectureList.map(prefecture => {
                                return (
                                    <option
                                        value={prefecture.id}
                                        key={prefecture.id}
                                    >
                                        {prefecture.name}
                                    </option>
                                );
                            })}
                        </CustomSelect>
                        <CheckContainer>
                            {displayIsChecked("Prefecture")}
                        </CheckContainer>
                    </SelectDiv>
                    <AddressContainer>
                        <InputContainer>
                            <InputContent
                                type="text"
                                // value={address1}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => changeHandler(e, "Address1")}
                                id="Address1"
                                name="Address1"
                                data-testid="address1"
                                ref={register({
                                    required: "Required"
                                })}
                            />
                            <LabelContent
                                htmlFor="Address1"
                                value={address1}
                                name="Address1"
                            >
                                Address1
                            </LabelContent>
                            <CheckContainer>
                                {displayIsChecked("Address1")}
                            </CheckContainer>
                        </InputContainer>
                    </AddressContainer>
                    <AddressContainer>
                        <InputContainer>
                            <InputContent
                                type="text"
                                id="Address2"
                                name="Address2"
                                ref={register}
                                // value={extendAddress}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => changeHandler(e, "Address2")}
                            />
                            <LabelContent
                                htmlFor="Address2"
                                value={address2}
                                name="Address2"
                            >
                                Address2
                            </LabelContent>
                        </InputContainer>
                    </AddressContainer>
                    <NameContainer>
                        <InputContainer>
                            <InputContent
                                type="text"
                                // value={name}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => changeHandler(e, "Name")}
                                id="Name"
                                name="Name"
                                ref={register({
                                    required: "Required"
                                })}
                            />
                            <LabelContent
                                htmlFor="Name"
                                value={name}
                                name="Name"
                            >
                                Name
                            </LabelContent>
                            <CheckContainer>
                                {displayIsChecked("Name")}
                            </CheckContainer>
                        </InputContainer>
                    </NameContainer>
                    <PhoneContainer>
                        <InputContainer>
                            <InputContent
                                type="text"
                                id="PhoneNumber"
                                name="PhoneNumber"
                                // value={phoneNumber}
                                ref={register}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => changeHandler(e, "PhoneNumber")}
                            />
                            <LabelContent
                                htmlFor="PhoneNumber"
                                value={phoneNumber}
                                name="PhoneNumber"
                            >
                                PhoneNumber
                            </LabelContent>
                        </InputContainer>
                    </PhoneContainer>
                </form>
                <BorderButton
                    paddingX={1}
                    paddingY={3}
                    color="grey"
                    onClick={() => makeAddressHandler(createOrAdd)}
                    disabled={isDisabled()}
                    data-testid="addressMakeButton"
                >
                    {isDisabled() ? "disable" : "create"}
                </BorderButton>
            </AllContainer>
        );
    };

    const returnCreateNewAddressForm = () => {
        return <>{commonForm("create")}</>;
    };
    const returnAddNewAddressForm = () => {
        return (
            <>
                <AddressInfo
                    defaultAddress={defaultAddress}
                    titleName="currentUseAddress"
                />
                <OtherAddresses
                    otherAddresses={otherAddresses}
                    addressInteractor={interactor}
                    setDefaultAddress={setDefaultAddress}
                    setOtherAddresses={setOtherAddresses}
                />

                {commonForm("add")}
            </>
        );
    };
    const makeAddrForm = () => {
        if (!isAddressLoaded) {
            return <CustomLoader />;
        }

        return (
            <>
                {defaultAddress === null
                    ? returnCreateNewAddressForm()
                    : returnAddNewAddressForm()}
            </>
        );
    };
    return { makeAddrForm };
};
const AllContainer = styled.div`
    width: 100%;
    /* height: 100%; */
    padding: 2rem;
`;
const AddressTitle = styled.div`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-family: "Lato", "sans-serif";
`;
const ZipMark = styled.div`
    margin-right: 1.5rem;
    margin-bottom: 18px;
`;
const ZipContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    ${customMedia.lessThan("breakpoint")`
           flex-direction:column;
           align-items:flex-start;
    `}
`;
const AddressContainer = styled.div`
    display: flex;
    width: 100%;
`;
const NameContainer = styled.div`
    display: flex;
    width: 100%;
`;
const PhoneContainer = styled.div`
    display: flex;
    width: 100%;
`;
const SelectDiv = styled.div`
    position: relative;
    float: left;
    min-width: 200px;
    /* margin: 50px 33%; */
    margin-bottom: 18px;

    &::after {
        content: ">";
        font: 17px "Consolas", monospace;
        color: #333;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
        right: 11px;
        /*Adjust for position however you want*/

        top: 18px;
        padding: 0 0 2px;
        border-bottom: 1px solid #999;
        /*left line */

        position: absolute;
        pointer-events: none;
    }
`;

const CustomSelect = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* Add some styling */

    display: block;
    width: 100%;
    max-width: 320px;
    height: 50px;
    float: right;
    /* margin: 5px 0px; */
    padding: 0px 24px;
    font-size: 16px;
    line-height: 1.75;
    color: ${Color.inputContentColor};
    background-color: ${Color.mainWhite};
    background-image: none;
    border: 1px solid #cccccc;
    -ms-word-break: normal;
    word-break: normal;

    &:focus {
        border: 1px solid ${Color.borderFocus};
        outline: none;
    }
`;
