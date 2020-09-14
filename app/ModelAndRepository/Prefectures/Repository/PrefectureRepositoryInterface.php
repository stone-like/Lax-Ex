<?php

namespace App\ModelAndRepository\Prefectures\Repository;

use App\ModelAndRepository\Prefectures\Prefecture;
use Illuminate\Support\Collection;



interface PrefectureRepositoryInterface
{
    public function getAllPrefecture(): Collection;
    public function getPrefectureName(array $ids): array;
    public function findPrefectureById(int $id): Prefecture;
}
