<?php

namespace App\ModelAndRepository\BuyProducts;

use App\ModelAndRepository\Products\Product;

interface BuyProductRepositoryInterface
{
    public function createBuyProduct(array $cartItem);
}
