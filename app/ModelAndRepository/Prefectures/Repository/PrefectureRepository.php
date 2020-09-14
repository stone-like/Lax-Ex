<?php

namespace App\ModelAndRepository\Prefectures\Repository;

use Illuminate\Support\Collection;
use App\Exceptions\PrefectureNotFoundException;
use App\ModelAndRepository\Prefectures\Prefecture;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\ModelAndRepository\Prefectures\Repository\PrefectureRepositoryInterface;

class PrefectureRepository implements PrefectureRepositoryInterface
{
    public function getAllPrefecture(): Collection
    {
        return Prefecture::all();
    }
    public function getPrefectureName(array $ids): array
    {
        $prefectureNameList = [];
        foreach ($ids as $id) {
            $prefecture = $this->findPrefectureById($id);
            array_push($prefectureNameList, $prefecture->name);
        }
        return $prefectureNameList;
    }
    public function findPrefectureById(int $id): Prefecture
    {

        try {
            return Prefecture::where("id", $id)->firstOrFail();
        } catch (ModelNotFoundException $e) {

            throw new PrefectureNotFoundException($e->getMessage());
        }
    }
}
