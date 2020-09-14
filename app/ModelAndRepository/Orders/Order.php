<?php

namespace App\ModelAndRepository\Orders;

use Illuminate\Database\Eloquent\Model;
use App\ModelAndRepository\Products\Product;
use App\ModelAndRepository\BuyProducts\Buyproduct;
use App\ModelAndRepository\OrderStatuses\OrderStatus;

class Order extends Model
{
    protected $fillable = [
        "address_id",
        "order_status_id",
        "user_id",
        "subtotal",
        "discount",
        "tax",
        "shipping_fee",
        "total",
        "shipped_at"

    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function address()
    {
        return $this->belongsTo(Address::class);
    }
    public function order_status()
    {
        return $this->belongsTo(OrderStatus::class);
    }
    public function buyproducts()
    {
        return $this->belongsToMany(Buyproduct::class);
    }
}
