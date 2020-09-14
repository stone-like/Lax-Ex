<?php

namespace App\ModelAndRepository\BuyProducts;

use Illuminate\Support\Str;
use App\ModelAndRepository\BuyProducts\BuyProductRepositoryInterface;



class BuyProductRepository implements BuyProductRepositoryInterface
{
    public function createBuyProduct(array $cartItem)
    {
        return Buyproduct::create([
            "name" => $cartItem["name"],
            "slug" => Str::slug($cartItem["name"]),
            "imagePath" => $cartItem["imagePath"],
            "price" => $cartItem["price"],
            "subtotal" => $cartItem["subtotal"],
            "buyQuantity" => $cartItem["quantity"],
        ]);
    }
}
