<?php

namespace App\ModelAndRepository\Shippings\Repository;

interface ShippingRepositoryInterface
{
    public function findShippingById(int $shipping_id);
    public function findShippingByPrice(int $price);
    public function createShipping(string $name, int $price);
    public function updateShipping(int $shipping_id, string $name, int $price);
    public function deleteShipping(int $shipping_id);
    public function searchByName(string $name);
    public function getAllShipping();
}
