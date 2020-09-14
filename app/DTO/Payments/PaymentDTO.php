<?php

namespace App\DTO\Payments;

use App\DTO\Addresses\AddressDTO;
use App\ModelAndRepository\Orders\Order;
use App\ModelAndRepository\Addresses\Address;
use Carbon\Carbon;

class PaymentDTO
{
    public static function CreateCardArray(string $cardlast4, string $brand, int $exp_month, int $exp_year, $name)
    {
        //cardのidは別に返す必要ない
        return [
            'cardlast4' => str_repeat('*', 8) . $cardlast4,
            'brand' => $brand,
            'exp_month' => $exp_month,
            'exp_year' => $exp_year,
            'name' => $name,
        ];
    }

    public static function numberFormatToInt(string $numString)
    {
        $parsed = intval(str_replace(',', '', $numString));
        return $parsed;
    }

    public static function createOrderInfo(Order $order, array $addressInfoArray, array $buyProductInfoArray, string $orderStatusName)
    {
        //created_atとかshipped_atはformatして表示させる
        //shipped_atは、もうDataTimeStringになっている
        // $shipped_at = $order->shipped_at ? (new Carbon($order->created_at))->toDateTimeString() : null;
        return [
            "id" => $order->id,
            "subtotal" => $order->subtotal,
            "discount" => $order->discount,
            "tax" => $order->tax,
            "shipping_fee" => $order->shipping_fee,
            "total" => $order->total,
            "created_at" => (new Carbon($order->created_at))->toDateTimeString(),
            "shipped_at" => $order->shipped_at,
            "order_status" => $orderStatusName,
            "address" => $addressInfoArray,
            "buyProductList" => $buyProductInfoArray
        ];
    }
}
