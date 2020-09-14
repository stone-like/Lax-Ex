<?php

namespace App\ModelAndRepository\Shippings\Repository;

use App\Exceptions\ShippingNotFoundException;
use App\ModelAndRepository\Shippings\Shipping;
use App\ModelAndRepository\Shippings\Repository\ShippingRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ShippingRepository implements ShippingRepositoryInterface
{
    public function findShippingById(int $shipping_id)
    {
        try {
            return Shipping::where("id", $shipping_id)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new ShippingNotFoundException($e->getMessage());
        }
    }
    public function findShippingByPrice(int $price)
    {
        try {
            return Shipping::where("price", $price)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new ShippingNotFoundException($e->getMessage());
        }
    }

    public function createShipping(string $name, int $price)
    {
        return Shipping::create(["name" => $name, "price" => $price]);
    }
    public function updateShipping(int $shipping_id, string $name, int $price)
    {
        $shipping = $this->findShippingById($shipping_id);
        $shipping->update(["name" => $name, "price" => $price]);
    }
    public function deleteShipping(int $shipping_id)
    {
        $shipping = $this->findShippingById($shipping_id);
        $shipping->delete();
    }
    public function searchByName(string $name)
    {
        return Shipping::where("name", "LIKE", "%{$name}%")->get();
    }
    public function getAllShipping()
    {

        return Shipping::all();
    }
}
