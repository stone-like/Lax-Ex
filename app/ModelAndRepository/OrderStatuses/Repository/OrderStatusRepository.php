<?php

namespace App\ModelAndRepository\OrderStatuses\Repository;

use App\Exceptions\OrderStatusNotFoundException;
use App\ModelAndRepository\OrderStatuses\OrderStatus;
use App\ModelAndRepository\OrderStatuses\Repository\OrderStatusRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderStatusRepository implements OrderStatusRepositoryInterface
{
    public function findOrderStatusByName(string $name)
    {
        try {
            return OrderStatus::where("name", $name)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new OrderStatusNotFoundException($e->getMessage());
        }
    }
    public function createOrderStatus(string $name)
    {
        return OrderStatus::create(["name" => $name]);
    }
    public function deleteOrderStatus(int $orderStatusId)
    {
        $order = $this->findOrderStatusById($orderStatusId);
        return $order->delete();
    }
    public function findOrderStatusById(int $orderStatusId)
    {
        try {
            return OrderStatus::where("id", $orderStatusId)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new OrderStatusNotFoundException($e->getMessage());
        }
    }

    public function searchByName(string $name)
    {
        return OrderStatus::where("name", "LIKE", "%{$name}%")->get();
    }

    public function getAllOrderStatus()
    {
        return OrderStatus::all();
    }
}
