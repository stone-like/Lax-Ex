<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */


use Illuminate\Support\Str;
use Faker\Generator as Faker;
use App\ModelAndRepository\Products\Product;

$factory->define(Product::class, function (Faker $faker) {

    $name = $faker->unique()->word;
    return [
        "name" => $name,
        "slug" => Str::slug($name),
        "description" => $faker->paragraph,
        "quantity" => 5,
        "price" => 10,
        "weight" => 300,
        "status" => "5 items left",
    ];
});
