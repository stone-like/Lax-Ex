<?php

namespace App\ModelAndRepository\ProductImages\Transforms;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ProductImageTransform
{
    public static function transformCreateRequest(Request $request)
    {
        $product_id = intval($request->product_id);
        $imageContentArray = [$request->image_content];

        return [
            "product_id" => $product_id,
            "imageContentArray" => $imageContentArray
        ];
    }

    public static function transformUpdateRequest(Request $request)
    {
        //     [
        //         image_ids=>[],
        //         image_contents=>[]
        //     ]から
        //    [
        //        imageObjeList=>[
        //            [id=>,image=>]
        //        ]
        //    ]の形にしてあげる
        $imageObjList = [];
        $idArray = $request->image_ids;
        $contentArray = $request->image_contents;
        foreach (array_map(null, $idArray, $contentArray) as [$id, $content]) {
            array_push($imageObjList, ["id" => intval($id), "image" => $content]);
        }

        return ["imageObjList" => $imageObjList];
    }

    public static function transformModelsToIds(Collection $productImageList)
    {
        $imageIds = [];
        foreach ($productImageList as $productImage) {
            array_push($imageIds, $productImage->id);
        }

        return $imageIds;
    }
}
