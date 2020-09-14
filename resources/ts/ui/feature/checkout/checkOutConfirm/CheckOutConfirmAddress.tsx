import React, { useEffect, useState } from "react";
import { AddressInfo } from "../addressInfo/AddressInfo";
import { Address } from "../../../../core/entity/Address";
import { AddressLaravel } from "../../../../core/repository/address/AddressLaravel";
import { AddressInteractor } from "../../../../core/usecase/AddressInteractor";
import styled from "styled-components";

type Props = {
    defaultAddress: Address;
};
export const CheckOutConfirmAddress = (props: Props) => {
    const { defaultAddress } = props;

    return (
        <AddressContainer>
            {defaultAddress && (
                <AddressInfo
                    titleName="Address"
                    defaultAddress={defaultAddress}
                />
            )}
        </AddressContainer>
    );
};

const AddressContainer = styled.div`
    margin-top: 2rem;
`;
