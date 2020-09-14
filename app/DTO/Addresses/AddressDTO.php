<?php

namespace App\DTO\Addresses;


class AddressDTO
{
    public static function AddressTransform(int $id, string $zip, string $address1, string $prefectureName, string $userName,  $address2 = null, $phoneNumber = null): array
    {
        return [
            "id" => $id,
            "zip" => $zip,
            "address1" => $address1,
            "prefectureName" => $prefectureName,
            "userName" => $userName,
            "address2" => $address2,
            "phoneNumber" => $phoneNumber
        ];
    }

    public static function AddressListTransform(array $addressList, array $prefectureList): array
    {

        $transformedAddressList = [];

        foreach ($addressList as $index => $address) {

            array_push($transformedAddressList, self::AddressTransform($address["id"], $address["zip"], $address["address1"], $prefectureList[$index], $address["userName"], $address["address2"], $address["phoneNumber"]));
        }
        return $transformedAddressList;
    }

    public static function ReturnDefaultAndOthersAddtess(array $defaultAddress, array $otherAddresses): array
    {
        return [
            "defaultAddress" => $defaultAddress,
            "otherAddresses" => $otherAddresses
        ];
    }
}
