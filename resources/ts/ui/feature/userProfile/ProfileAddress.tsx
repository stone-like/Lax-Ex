import React, { useState, useEffect } from "react";
import { AddressLaravel } from "../../../core/repository/address/AddressLaravel";
import { AddressInteractor } from "../../../core/usecase/AddressInteractor";
import { PrefectureLaravel } from "../../../core/repository/prefecture/PrefectureLaravel";
import { PrefectureInteractor } from "../../../core/usecase/PrefectureInteractor";
import { useHistory } from "react-router-dom";
import { prefectureEntityList } from "../../../core/repository/prefecture/PrefectureType";
import { Address } from "../../../core/entity/Address";
import { addressEntityList } from "../../../core/repository/address/AddressType";
import { useAddress } from "../../../util/hooks/useAddress";
import { AddressInfo } from "../checkout/addressInfo/AddressInfo";
import { OtherAddresses } from "../checkout/checkOutAddressAndCard/OtherAddresses";
import styled from "styled-components";

export const ProfileAddress = () => {
    const history = useHistory();

    const prefectureRepository = new PrefectureLaravel();
    const prefectureInteractor = new PrefectureInteractor(prefectureRepository);
    const [prefectureList, setPrefectureList] = useState<prefectureEntityList>(
        []
    );
    const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
    const [otherAddresses, setOtherAddresses] = useState<addressEntityList>([]);
    const [isAddressLoaded, setIsAddressLoaded] = useState<boolean>(false);

    const { makeAddrForm } = useAddress({
        setDefaultAddress,
        setOtherAddresses,
        prefectureList,
        defaultAddress,
        otherAddresses,
        isAddressLoaded,
        setIsAddressLoaded
    });

    const getAllPrefecture = async () => {
        const res = await prefectureInteractor.getAllPrefecture();
        setPrefectureList(res);
    };

    useEffect(() => {
        getAllPrefecture();
    }, []);
    return (
        <ProfileAddressContainer>
            <ProfileAddressWrapper>{makeAddrForm()}</ProfileAddressWrapper>
        </ProfileAddressContainer>
    );
};

const ProfileAddressContainer = styled.div`
    width: 100%;
    padding: 5rem 2rem;
    display: flex;
    justify-content: center;
`;

const ProfileAddressWrapper = styled.div`
    width: 70%;
`;
