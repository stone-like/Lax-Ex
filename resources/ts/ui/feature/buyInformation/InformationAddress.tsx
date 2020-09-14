import React from "react";
import styled from "styled-components";
import { AddressInfo } from "../checkout/addressInfo/AddressInfo";
import { Address } from "../../../core/entity/Address";

type Props = {
    address: Address;
};
export const InformationAddress = (props: Props) => {
    const { address } = props;
    return (
        <InformationAddressContainer>
            <InformationWrapper>
                <AddressInfo defaultAddress={address} titleName="Ship to" />
            </InformationWrapper>
        </InformationAddressContainer>
    );
};

const InformationAddressContainer = styled.div`
    width: 100%;
    padding: 2rem;
    margin-top: 2rem;
`;
const InformationWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
