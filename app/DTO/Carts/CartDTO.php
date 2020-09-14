<?php

namespace App\DTO\Carts;

use App\Entity\Carts\Cart;
use Illuminate\Support\Collection;



class CartDTO
{
    //cartitem一つにつきrowIdが発行される、フロントでもそのrowIdをつかってUIupdateとかしたい
    public static function AddTransform(string $subtotal, int $quantity, string $productName, string $rowId, string $imagePath, int $price): array
    {
        //一応add,delete、updateが起こるたびにすべて返した方がいいかもしれない
        return [

            "subtotal" => $subtotal,
            "quantity" => $quantity,
            "productName" => $productName,
            "rowId" => $rowId,
            "imagePath" => $imagePath,
            "price" => $price
        ];
    }
    public static function UpdateTransform(string $rowId, int $quantity, string $subtotal, string $cartSubTotal): array
    {

        //updateの場合cart画面でupdateしたrowIdの情報と変化が伴うので、quantity、subtotal、cartSubtotalが欲しい
        return [
            "rowId" => $rowId,
            "quantity" => $quantity,
            "subtotal" => $subtotal,
            "cartSubTotal" => $cartSubTotal
        ];
    }

    public static function FlattenCartImage(array $cartArray): array
    {
        $cartItems = $cartArray["cartitems"];
        //今追加したカートと、追加したproductの情報と、カートの点数がいる
        $flattenedCartItems = [];
        foreach ($cartItems as $cartItem) {

            $flattenedCartItem =  [
                "rowId" => $cartItem->rowId,
                "product_id" => $cartItem->id,
                "quantity" => $cartItem->qty,
                "name" => $cartItem->name,
                "price" => $cartItem->price,
                "weight" => $cartItem->weight,
                "imagePath" => $cartItem->options["image"] ?? "",
                "subtotal" => $cartItem->subtotal()
            ];
            array_push($flattenedCartItems, $flattenedCartItem);
        }
        return [
            "cartSubTotal" => $cartArray["subtotal"],
            "cartCount" => $cartArray["cartCount"],
            "tax" => $cartArray["tax"],
            "discount" => $cartArray["discount"],
            "shippingFee" => $cartArray["shippingFee"],
            "total" => $cartArray["total"],
            "cartItems" => $flattenedCartItems
        ];
    }
    public static function CreateIdentifier(string $username, int $user_id)
    {
        return $username . "_" . $user_id;
    }
}
