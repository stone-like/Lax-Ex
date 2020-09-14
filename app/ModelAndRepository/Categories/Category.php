<?php

namespace App\ModelAndRepository\Categories;

use Illuminate\Database\Eloquent\Model;
use App\ModelAndRepository\Products\Product;

class Category extends Model
{
    protected $fillable  = [
        "name",
        "slug"
    ];
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
