<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\ModelAndRepository\Categories\Category;

$factory->define(Category::class, function (Faker $faker) {
    $name = $faker->unique()->randomElement([
        "Book",
        "Cloth",
        "Shoes",
        "Grocery",
        "Toy",
        "Game"
    ]);
    return [
        "name"=>$name,
        "slug"=>Str::slug($name)
    ];
});
