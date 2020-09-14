<?php

namespace App\DTO\Shippings;

class ShippingDTO
{
    public static function createShippingInfoArray(int $default_shipping_id, array $shippingList)
    {
        return [
            "defaultValue" => $default_shipping_id,
            "shippingList" => $shippingList
        ];
    }
}
