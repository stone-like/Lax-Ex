<?php

use Illuminate\Database\Seeder;
use App\ModelAndRepository\Discounts\Discount;

class DiscountTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Discount::create(["discountCode" => "dummy", "discountPrice" => 10]);
    }
}
