import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PrefectureLaravel } from "../../../../core/repository/prefecture/PrefectureLaravel";
import { PrefectureInteractor } from "../../../../core/usecase/PrefectureInteractor";
import { prefectureEntityList } from "../../../../core/repository/prefecture/PrefectureType";
import { Form, DropdownItemProps } from "semantic-ui-react";
import Select from "react-select";
import { addressFormType, addrReturnType } from "./form/addresstype";
import { Core as YubinBangoCore } from "yubinbango-core";
import { Address } from "../../../../core/entity/Address";
import { AddressInteractor } from "../../../../core/usecase/AddressInteractor";
import { AddressLaravel } from "../../../../core/repository/address/AddressLaravel";
import { addressEntityList } from "../../../../core/repository/address/AddressType";
import { AddressInfo } from "../addressInfo/AddressInfo";
import { OtherAddresses } from "./OtherAddresses";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import { useAddress } from "../../../../util/hooks/useAddress";
import { BorderButton } from "../../../app/util/css/BorderButton";
import { customMedia } from "../../../app/util/css/Media";
type Props = {
    // prefectureList: prefectureEntityList;
    // setDefaultAddress: React.Dispatch<React.SetStateAction<Address>>;
    // setOtherAddresses: React.Dispatch<React.SetStateAction<addressEntityList>>;
    // defaultAddress: Address;
    // otherAddresses: addressEntityList;
    // isAddressLoaded: boolean;
    // setIsAddressLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    makeAddrForm: () => JSX.Element;
};

export const CheckOutAddress = (props: Props) => {
    const {
        // prefectureList,
        // setDefaultAddress,
        // setOtherAddresses,
        // defaultAddress,
        // otherAddresses,
        // isAddressLoaded,
        // setIsAddressLoaded
        makeAddrForm
    } = props;

    // const { makeAddrForm } = useAddress({
    //     setDefaultAddress,
    //     setOtherAddresses,
    //     prefectureList,
    //     isAddressLoaded,
    //     setIsAddressLoaded,
    //     defaultAddress,
    //     otherAddresses
    // });
    // const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
    // const [otherAddresses, setOtherAddresses] = useState<addressEntityList>([]);

    // const repository = new AddressLaravel();
    // const interactor = new AddressInteractor(repository);

    // const { makeAddrForm } = useAddress({
    //     setDefaultAddress,
    //     setOtherAddresses,
    //     prefectureList,
    //     interactor
    // });

    // const getAddresses = async () => {
    //     const addressRes = await interactor.getDefaultAddress();
    //     setDefaultAddress(addressRes);
    //     //defaultがnullの場合ほかのaddressも存在しないので
    //     if (addressRes === null) {
    //         return;
    //     }

    //     const res = await interactor.getAllAddressExceptDefault();
    //     setOtherAddresses(res);
    // };

    // //getAddressとかただ情報一覧を取得するのはだいたいそのページに到達したときで、確かにAuthがいるんだけど、get時に弾くというよりは、そもそもページ到達前に弾いた方がいいかも
    // useEffect(() => {
    //     getAddresses();
    // }, []);

    // const returnCreateNewAddressForm = () => {
    //     return <>{makeAddrForm("create")}</>;
    // };
    // const returnAddNewAddressForm = () => {
    //     return (
    //         <>
    //             <AddressInfo
    //                 defaultAddress={defaultAddress}
    //                 titleName="currentUseAddress"
    //             />
    //             <OtherAddresses
    //                 otherAddresses={otherAddresses}
    //                 addressInteractor={interactor}
    //                 setDefaultAddress={setDefaultAddress}
    //                 setOtherAddresses={setOtherAddresses}
    //             />

    //             {makeAddrForm("add")}
    //         </>
    //     );
    // };
    return (
        <AddressContainer>
            <AddressWrapper>
                {makeAddrForm()}
                {/* {returnAddNewAddressForm()} */}
            </AddressWrapper>
        </AddressContainer>
    );
};

const AddressContainer = styled.div`
    width: 50%;
    height: 100%;
    padding: 2rem;

    ${customMedia.lessThan("breakpoint")`
            width:100%;
    `}
`;
const AddressWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
