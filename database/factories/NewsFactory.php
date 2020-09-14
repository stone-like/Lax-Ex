<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use Faker\Generator as Faker;
use App\ModelAndRepository\News\News;

$factory->define(News::class, function (Faker $faker) {
    return [
        "title" => $faker->word,
        "content" => $faker->paragraph
    ];
});
