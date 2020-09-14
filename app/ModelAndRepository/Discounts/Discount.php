<?php

namespace App\ModelAndRepository\Discounts;



use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $fillable = [
        "discountCode",
        "discountPrice"
    ];
}
