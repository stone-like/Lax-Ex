import React from "react";
import { Address } from "../../../../core/entity/Address";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";
import { customMedia } from "../../../app/util/css/Media";

type Props = {
    defaultAddress: Address;
    titleName: string;
};
export const AddressInfo = (props: Props) => {
    const { defaultAddress, titleName } = props;
    return (
        <InfoContainer>
            <InfoTitle>{titleName}</InfoTitle>
            <InfoContent>
                <NameAndPhoneContainer>
                    <InfoName data-testid="defaultAddressName">
                        {defaultAddress.userName}
                    </InfoName>
                    {defaultAddress.phoneNumber && (
                        <InfoPhone>
                            <span>TEL</span>
                            <PhoneSpan>{defaultAddress.phoneNumber}</PhoneSpan>
                        </InfoPhone>
                    )}
                </NameAndPhoneContainer>
                <InfoZip>￥{defaultAddress.zip}</InfoZip>
                <InfoAddress>
                    {defaultAddress.prefectureName + defaultAddress.address1}
                </InfoAddress>
                <InfoAddress>{defaultAddress.address2}</InfoAddress>
            </InfoContent>
        </InfoContainer>
    );
};

const InfoContainer = styled.div`
    width: 100%;
    padding: 2rem;
    border: 1px solid ${Color.border};
`;
const InfoTitle = styled.div`
    font-size: 2rem;
`;

const InfoContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`;
const InfoZip = styled.div`
    margin-top: 1rem;
`;
const InfoAddress = styled.div`
    margin-top: 1rem;
`;

const NameAndPhoneContainer = styled.div`
    display: flex;
    ${customMedia.lessThan("breakpoint")`
           flex-direction:column;
    `}
`;
const InfoName = styled.span`
    font-size: 2rem;
    font-weight: 900;
`;
const InfoPhone = styled.span`
    margin-left: 5rem;
    ${customMedia.lessThan("breakpoint")`
           margin-left:0;
           margin-top:2rem;
    `}
`;
const PhoneSpan = styled.span`
    margin-left: 1rem;
`;
