<?php

namespace App\ModelAndRepository\Orders\Repository;

use App\Exceptions\OrderNotFoundException;
use App\ModelAndRepository\Orders\Order;
use App\ModelAndRepository\Products\Product;
use App\ModelAndRepository\BuyProducts\Buyproduct;
use App\ModelAndRepository\Orders\Repository\OrderRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderRepository implements OrderRepositoryInterface
{
    public function createOrder(array $cartInfoArray, int $address_id, int $user_id, int $order_status_id): Order
    {
        //orderからまたaddress_idをとりだして、そこからもう一度addressを取り出すのと、すでにあるaddressを使うのはどっちがいいのか？
        //例えばOrder::createの戻り値で値が変わってしまっていたりするならOrder::createの返り値からとるしかない、
        //しかし、事前にもう値があり変更も特にされていないなら以前のを使ってしまっていいんじゃないかと思う(取得する際遅くなければどっちでもいいのかもしれないけど)
        $order = Order::create([
            "user_id" => $user_id,
            "address_id" => $address_id,
            "order_status_id" => $order_status_id,
            "subtotal" => $cartInfoArray["cartSubTotal"],
            "discount" => $cartInfoArray["discount"],
            "tax" => $cartInfoArray["tax"],
            "shipping_fee" => $cartInfoArray["shippingFee"],
            "total" => $cartInfoArray["total"]
        ]);
        return $order;
    }



    public function attachProduct(Order $order, Buyproduct $buyProduct)
    {
        $order->buyproducts()->attach($buyProduct);
    }

    public function getUserOrder(int $userId)
    {
        return  Order::where("user_id", $userId)->get();
    }

    public function getAllOrder()
    {
        return Order::all();
    }
    public function updateOrder(int $orderId, string $shipped_at, int $orderStatusId)
    {
        $order = $this->findOrderById($orderId);
        return $order->update([
            "shipped_at" => $shipped_at,
            "order_status_id" => $orderStatusId
        ]);
    }
    public function findOrderById(int $orderId)
    {
        try {
            return Order::where("id", $orderId)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new OrderNotFoundException($e->getMessage());
        }
    }
    public function findOrderByOrderStatusId(int $orderStatusId)
    {
        //whereHasの第一引数はmodelでorderと関係を結んでいるmethod名、この場合はorder_status
        return Order::whereHas("order_status", function ($query) use ($orderStatusId) {
            $query->whereIn("id", [$orderStatusId]);
        })->get();
    }
}
