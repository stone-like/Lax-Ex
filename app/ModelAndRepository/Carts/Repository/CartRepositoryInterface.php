<?php

namespace App\ModelAndRepository\Carts\Repository;

use Illuminate\Support\Collection;
use Gloudemans\Shoppingcart\CartItem;
use App\ModelAndRepository\Products\Product;



interface CartRepositoryInterface
{
    public function addCartToList(Product $product, int $quantity, $options = []): CartItem;
    public function updateQuantity(string $rowId, int $quantity): CartItem;
    public function clearCart();
    public function removeCart(string $rowId);
    public function storeToDatabase(string $username);
    public function  restoreFromDatabase(string $username);
    public function  eraseDatabase(string $username);
    public function mergeToDatabase(string $username);
    public function getDBContent(string $username);
    public function checkIdentifier(string $username): bool;
    public function getTotal(): string;
    public function getSubTotal(): string;
    public function getTax(): string;
    public function setGlobalDiscount(int $discount);
    public function setShippingFee(int $shippingFee);
    public function getShippingFee();
    public function clearShippingFee();

    public function getDiscount(): string;
    public function getCartItems();
    public function getTransfromedCartItems(): array;
    public function getItemCount(): int;
    public function getItem(string $rowId): CartItem;
}
