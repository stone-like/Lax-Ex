<?php

namespace App\ModelAndRepository\Orders\Repository;

use App\ModelAndRepository\Orders\Order;
use App\ModelAndRepository\Products\Product;
use App\ModelAndRepository\BuyProducts\Buyproduct;

interface OrderRepositoryInterface
{
    //本当はentityなり特定のフレームワークに依存しない形にして返さなくてはいけない
    public function createOrder(array $cartInfoArray, int $address_id, int $user_id, int $order_status_id): Order;
    public function attachProduct(Order $order, Buyproduct $buyProduct);
    public function getUserOrder(int $userId);
    public function getAllOrder();
    public function findOrderByOrderStatusId(int $orderStatusId);
    public function updateOrder(int $orderId, string $shipped_at, int $orderStatusId);
    public function findOrderById(int $orderId);
}
