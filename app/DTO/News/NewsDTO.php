<?php

namespace App\DTO\News;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class NewsDTO
{
    public static function WithPagination(array $newsInfoArray)
    {
        $newsList = self::convertNewsListToAppropriateDataTimeNewsList($newsInfoArray["data"]);

        return [
            "data" => $newsList,
            "meta" => [
                "total" => $newsInfoArray["total"],
                "per_page" => $newsInfoArray["per_page"],
                "current_page" => $newsInfoArray["current_page"]
            ]
        ];
    }

    public static function createNewsArray(array $newsList)
    {
        $newsList = self::convertNewsListToAppropriateDataTimeNewsList($newsList);
        return $newsList;
    }

    public static function convertNewsListToAppropriateDataTimeNewsList(array $newsList)
    {
        $convertedNewsList = [];
        foreach ($newsList as $news) {
            array_push($convertedNewsList, self::convertTimeToYYYY_MM_dd($news));
        }
        return $convertedNewsList;
    }

    public static function convertTimeToYYYY_MM_dd(array $eachNews)
    {
        return [
            "id" => $eachNews["id"],
            "title" => $eachNews["title"],
            "content" => $eachNews["content"],
            "created_at" => (new Carbon($eachNews["created_at"]))->toDateString(),
            "updated_at" => (new Carbon($eachNews["updated_at"]))->toDateString()
        ];
    }
}
