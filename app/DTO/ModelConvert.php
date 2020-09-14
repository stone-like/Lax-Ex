<?php

namespace App\DTO;

use ReflectionClass;
use Illuminate\Database\Eloquent\Model;

trait ModelConvert
{
    static function modelsToIds($models): array
    {
        $ids = [];
        foreach ($models as $model) {
            array_push($ids, $model->id);
        }

        return $ids;
    }
    // static function idsToModels(array $ids, string $modelName): array
    // {
    //     $models = [];
    //toDo:ここのmodelの取得方法を作る
    //     $fullModel = "App\ModelAndRepository\\" . $modelName . 's';
    //     foreach ($ids as $id) {
    //         $model = $fullModel::where("id", $id)->first();
    //         array_push($models, $model);
    //     }

    //     return $models;
    // }


}
