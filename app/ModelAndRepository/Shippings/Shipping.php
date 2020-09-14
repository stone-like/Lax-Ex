<?php

namespace App\ModelAndRepository\Shippings;



use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $fillable = [
        "name", "price"
    ];
}
