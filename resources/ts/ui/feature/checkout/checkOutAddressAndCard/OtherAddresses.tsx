import React from "react";
import { addressEntityList } from "../../../../core/repository/address/AddressType";
import { AddressInteractor } from "../../../../core/usecase/AddressInteractor";
import { Redirect } from "react-router-dom";
import { UserLaravel } from "../../../../core/repository/user/UserLaravel";
import { UserInteractor } from "../../../../core/usecase/UserInteractor";
import { Address } from "../../../../core/entity/Address";
import styled from "styled-components";
import { BorderButton } from "../../../app/util/css/BorderButton";
import Color from "../../../app/util/css/Color";
import { Border } from "../../../app/util/css/Border";
import { customMedia } from "../../../app/util/css/Media";

type Props = {
    otherAddresses: addressEntityList;
    addressInteractor: AddressInteractor;
    setDefaultAddress: React.Dispatch<React.SetStateAction<Address>>;
    setOtherAddresses: React.Dispatch<React.SetStateAction<addressEntityList>>;
};
export const OtherAddresses = (props: Props) => {
    const {
        otherAddresses,
        addressInteractor,
        setOtherAddresses,
        setDefaultAddress
    } = props;
    const userRepository = new UserLaravel();
    const userInteractor = new UserInteractor(userRepository);
    const deleteAddressHandler = async (addressId: number) => {
        const res = await addressInteractor.deleteAddress(addressId);

        if (res.isFailure()) {
            return (
                <Redirect
                    to={{
                        pathname: "/admin/error",
                        state: { error: { errors: res.value } }
                    }}
                />
            );
        }
        setOtherAddresses(res.value);
    };

    //changeDefaultAddressの取り扱いが難しい・・・というのもaddress_idを扱うんだけど、操作するのはuserTable、
    //入出力がAddressIdとAddressEntity(List)となっている
    //なのでフロントではaddressInteractor、バックではuserControllerとするか、両方addressまたはuserに統一するかにしたい
    //ここでは入出力がaddressなのでフロントをaddress、バックもaddressでaddressControllerでuserRepositoryを使うことにする
    const changeDefaultAddressHandler = async (addressId: number) => {
        const res = await addressInteractor.changeDefaultAddress(addressId);
        if (res.isFailure()) {
            return (
                <Redirect
                    to={{
                        pathname: "/admin/error",
                        state: { error: { errors: res.value } }
                    }}
                />
            );
        }
        setDefaultAddress(res.value.defaultAddress);
        setOtherAddresses(res.value.otherAddresses);
    };
    return (
        <OtherContainer>
            <OtherTitle>OtherAddresses</OtherTitle>
            {otherAddresses.map(address => {
                return (
                    <>
                        <OtherContent key={address.id}>
                            <NameAndPhoneContainer>
                                <OtherName data-testid="otherAddressName">
                                    {address.userName}
                                </OtherName>
                                <OtherPhone>
                                    TEL
                                    <PhoneSpan>{address.phoneNumber}</PhoneSpan>
                                </OtherPhone>
                            </NameAndPhoneContainer>
                            <OtherZip>￥{address.zip}</OtherZip>
                            <OtherAddress>
                                {address.prefectureName + address.address1}
                            </OtherAddress>
                            <OtherAddress>{address.address2}</OtherAddress>
                            <ButtonContainer>
                                <BorderButton
                                    paddingY={0.1}
                                    paddingX={0.3}
                                    color="grey"
                                    onClick={() =>
                                        changeDefaultAddressHandler(address.id)
                                    }
                                >
                                    useThisAddress
                                </BorderButton>
                                <BorderButton
                                    style={{ marginLeft: "1.2rem" }}
                                    paddingY={0.1}
                                    paddingX={0.3}
                                    color="grey"
                                    onClick={() =>
                                        deleteAddressHandler(address.id)
                                    }
                                >
                                    delete
                                </BorderButton>
                            </ButtonContainer>
                        </OtherContent>
                        <Border height={1} color={Color.border} />
                    </>
                );
            })}
        </OtherContainer>
    );
};

const OtherContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
    border: 1px solid ${Color.border};

    margin-top: 4rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    margin-left: auto;
    /* width: 100%; */
    ${customMedia.lessThan("breakpoint")`
           margin-left:0;
           margin-top:2rem;
    `}
`;

const PhoneSpan = styled.span`
    margin-left: 1rem;
`;
const OtherTitle = styled.div`
    font-size: 2rem;
`;

const OtherContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    width: 100%;
    margin-bottom: 0.5rem;
`;
const OtherZip = styled.div`
    margin-top: 1rem;
`;
const OtherAddress = styled.div`
    margin-top: 1rem;
`;

const NameAndPhoneContainer = styled.div`
    display: flex;
    ${customMedia.lessThan("breakpoint")`
           flex-direction:column;
    `}
`;
const OtherName = styled.span`
    font-size: 2rem;
    font-weight: 900;
`;
const OtherPhone = styled.span`
    margin-left: 5rem;
    ${customMedia.lessThan("breakpoint")`
           margin-left:0;
           margin-top:2rem;
    `}
`;
