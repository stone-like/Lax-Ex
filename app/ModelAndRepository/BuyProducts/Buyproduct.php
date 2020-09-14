<?php

namespace App\ModelAndRepository\BuyProducts;

use Illuminate\Database\Eloquent\Model;
use App\ModelAndRepository\Orders\Order;

class Buyproduct extends Model
{
    protected $fillable = [
        "name",
        "slug",
        "imagePath",
        "price",
        "subtotal",
        "buyQuantity"
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }
}
