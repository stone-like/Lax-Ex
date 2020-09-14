<?php

namespace App\ModelAndRepository\OrderStatuses\Repository;

interface OrderStatusRepositoryInterface
{
    public function findOrderStatusByName(string $name);
    public function createOrderStatus(string $name);
    public function deleteOrderStatus(int $orderStatusId);
    public function findOrderStatusById(int $orderStatusId);
    public function getAllOrderStatus();
    public function searchByName(string $name);
}
