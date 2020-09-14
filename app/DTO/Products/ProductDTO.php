<?php

namespace App\DTO\Products;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\ModelAndRepository\Products\Product;

//fatModelを防ぐために、transformを作ったならこちらに操作を一任すべき？
//例えばProduct::getStatusではなく、ここでgetStatusしてしまうとか？
class ProductDTO
{
    public static function transformRequest(Request $request)
    {

        $request = new Request($request->all());
        $request->merge([
            "status" => self::getStatus($request->quantity),
            "slug" => Str::slug($request->name)
        ]);

        return $request->all();
    }
    public static function excludePage(Request $request)
    {

        $request = new Request($request->all());

        return $request->except("page");
    }


    public static function getStatus(int $quantity): string
    {
        if ($quantity === 0) {
            return   "sold out";
        }

        if ($quantity === 1) {
            return  "1 item left";
        }

        return $quantity . " items left";
    }

    public static function mapImageHandler(Collection $productImages): array
    {
        $images = [];
        foreach ($productImages as $image) {
            array_push($images, [
                "id" => $image->id,
                "image" => $image->image
            ]);
        }
        return $images;
    }

    public static function craeteProductInfoArray(Product $product)
    {
        $images = [];

        if (count($product->productImages) !== 0) {
            $images = self::mapImageHandler($product->productImages);
        }

        return [
            "id" => $product->id,
            "name" =>  $product->name,
            "slug" =>  $product->slug,
            "description" =>  $product->description,
            "quantity" =>  $product->quantity,
            "weight" =>  $product->weight,
            "price" =>  $product->price,
            "status" =>  $product->status,
            "category_id" =>  $product->category_id,
            "images" => $images
        ];
    }

    public static function createProductListInfoArray($productList)
    {
        $productListInfoArray = [];
        foreach ($productList as $product) {
            $transformedProduct = self::craeteProductInfoArray($product);
            array_push($productListInfoArray, $transformedProduct);
        }
        return $productListInfoArray;
    }
}
