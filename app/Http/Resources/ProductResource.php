<?php

namespace App\Http\Resources;

use App\ModelAndRepository\ProductImages\ProductImages;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;


//productDTOとしてまとめてしまった方が良かったかも
class ProductResource extends JsonResource
{
    public function mapImageHandler(Collection $productImages): array
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
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $images = [];

        if (count($this->productImages) !== 0) {
            $images = $this->mapImageHandler($this->productImages);
        }

        return [
            "id" => $this->id,
            "name" =>  $this->name,
            "slug" =>  $this->slug,
            "description" =>  $this->description,
            "quantity" =>  $this->quantity,
            "weight" =>  $this->weight,
            "price" =>  $this->price,
            "status" =>  $this->status,
            "category_id" =>  $this->category_id,
            "images" => $images
        ];
    }
}
