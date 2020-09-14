<?php

namespace App\ModelAndRepository\Discounts\Repository;

use App\Exceptions\DiscountNotFoundException;
use App\ModelAndRepository\Discounts\Discount;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\ModelAndRepository\Discounts\Repository\DiscountRepositoryInterface;

class DiscountRepository implements DiscountRepositoryInterface
{
    //完全一致で無ければならない
    //validationのExistsでも一応弾いているけど
    public function findDiscountByDiscountCode(string $codeName)
    {
        try {
            return Discount::where("discountCode", $codeName)->firstOrFail();
        } catch (ModelNotFoundException $e) {

            $errorArray = [
                "errors" =>
                ["discountCode" => ["this code is invalid,please make sure use valid code"]]

            ];
            throw new HttpResponseException(
                response()->json($errorArray, 422)
            );
        }
    }

    public function findDiscountById(int $discount_id)
    {
        try {
            return Discount::where("id", $discount_id)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            //このmethodはvalidationであらかじめ弾かれることなく到達するので、ここでdiscountCodeのErrorを出さなければいけない
            throw new DiscountNotFoundException($e->getMessage());
        }
    }

    public function getAllDiscount()
    {
        return Discount::all();
    }

    public function searchByName(string $name)
    {
        return Discount::where("discountCode", "LIKE", "%{$name}%")->get();
    }


    public function createDiscount(string $discountCode, int $discountPrice)
    {
        return Discount::create([
            "discountCode" => $discountCode,
            "discountPrice" => $discountPrice
        ]);
    }
    public function deleteDiscount(int $discount_id)
    {
        $discount = $this->findDiscountById($discount_id);
        $discount->delete();
    }
}
