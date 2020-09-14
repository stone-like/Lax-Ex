<?php

namespace App\ModelAndRepository\Products;


use Illuminate\Database\Eloquent\Model;
use App\ModelAndRepository\Orders\Order;
use Gloudemans\Shoppingcart\Contracts\Buyable;
use App\ModelAndRepository\Categories\Category;
use App\ModelAndRepository\ProductImages\ProductImages;

class Product extends Model implements Buyable
{
    protected $fillable = [
        "name",
        "slug",
        "description",
        "image",
        "price",
        "quantity",
        "weight",
        "status",
        "category_id"
    ];

    protected $with = ["productimages"];

    public function categories()
    {
        return $this->belongsTo(Category::class);
    }



    public function productImages()
    {
        return $this->hasMany(ProductImages::class);
    }

    public function getBuyableIdentifier($options = null)
    {
        return $this->id;
    }
    public function getBuyableDescription($options = null)
    {
        return $this->name;
    }
    public function getBuyablePrice($options = null)
    {
        return $this->price;
    }
    //weightはないけどbuyableのために要るみたい
    public function getBuyableWeight($options = null)
    {
        return $this->weight;
    }
}
