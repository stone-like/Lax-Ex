<?php

namespace App\ModelAndRepository\Carts\Repository;

use Illuminate\Support\Collection;
use Gloudemans\Shoppingcart\CartItem;
use App\ModelAndRepository\Products\Product;
use App\ModelAndRepository\Carts\ShoppingCart;
use App\ModelAndRepository\Shippings\Shipping;
use App\ModelAndRepository\Carts\Repository\CartRepositoryInterface;



class CartRepository implements CartRepositoryInterface
{

    protected $cart;

    public function __construct()
    {
        $this->cart = new ShoppingCart;
    }

    //Databaseと表記されているものはログイン時のDatabase関連、それ以外のaddとかはroguinnしていなくても使えるsession関連
    public function addCartToList(Product $product, int $quantity, $options = []): CartItem
    {
        return $this->cart->add($product, $quantity, $options);
    }
    public function updateQuantity(string $rowId, int $quantity): CartItem
    {
        return $this->cart->update($rowId, $quantity);
    }
    public function clearCart()
    {
        //shippingも削除する、shippingはdatabaseではなく、sessionのことなのでeraseではなくclear
        $this->cart->destroy();
        $this->clearShippingFee();
    }
    public function removeCart(string $rowId)
    {
        $this->cart->remove($rowId);
    }
    public function storeToDatabase(string $username)
    {
        $this->cart->store($username);
    }
    public function  restoreFromDatabase(string $username)
    {
        $this->cart->restore($username);
    }
    public function  eraseDatabase(string $username)
    {

        $this->cart->erase($username);
    }
    public function mergeToDatabase(string $username)
    {
        $this->cart->merge($username);
    }
    public function getDBContent(string $username)
    {
        return $this->cart->getDBContent($username);
    }
    public function checkIdentifier(string $username): bool
    {
        return $this->cart->checkIdentifier($username);
    }
    public function getTotal(): string
    {

        return $this->cart->total();
    }
    public function getSubTotal(): string
    {
        return $this->cart->subtotal();
    }
    public function getTax(): string
    {
        return $this->cart->tax();
    }
    public function setGlobalDiscount(int $discount)
    {
        return $this->cart->setGlobalDiscount($discount);
    }
    public function getDiscount(): string
    {
        return $this->cart->discount();
    }
    public function setShippingFee(int $shippingFee)
    {
        $this->cart->setShippingFee($shippingFee);
    }
    public function clearShippingFee()
    {
        $this->cart->clearShippingFee();
    }
    public function getShippingFee()
    {
        return $this->cart->getShippingFee();
    }
    public function getItemCount(): int
    {
        return $this->cart->count();
    }
    public function getItem(string $rowId): CartItem
    {
        return $this->cart->get($rowId);
    }
    //Eloquentじゃない方のCollection
    //collectionで型はいいはずだけどなぜかawsではarrayとなっている？
    public function getCartItems()
    {
        return $this->cart->content();
    }

    //他repositoryの内容を使うのでこれはcontroller行きかも,あとでリファクタリング
    public function getTransfromedCartItems(): array
    {
        $cartItems = $this->getCartItems();

        $subtotal = $this->getSubtotal();
        $cartCount = count($cartItems);
        $tax = $this->getTax();
        $discount = $this->getDiscount();
        $shippingFee = $this->getShippingFee();

        $total = $this->getTotal($shippingFee);

        return [
            "subtotal" => $subtotal,
            "cartCount" => $cartCount,
            "tax" => $tax,
            "discount" => $discount,
            "shippingFee" => $shippingFee,
            "total" => $total,
            "cartitems" => $cartItems
        ];
    }
}
