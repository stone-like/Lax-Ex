<?php

namespace App\Http\Controllers;

use App\ModelAndRepository\Prefectures\Repository\PrefectureRepositoryInterface;
use Illuminate\Http\Request;

class PrefectureController extends Controller
{
    private $prefectureRepo;
    public function __construct(PrefectureRepositoryInterface $prefectureRepo)
    {
        $this->prefectureRepo = $prefectureRepo;
    }
    public function getAllPrefecture()
    {
        return $this->prefectureRepo->getAllPrefecture();
    }
}
