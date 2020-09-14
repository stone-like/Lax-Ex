<?php

use Illuminate\Database\Seeder;
use App\ModelAndRepository\Shippings\Shipping;

class ShippingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Shipping::create(["name" => "normal", "price" => 0]);
        Shipping::create(["name" => "premier", "price" => 500]);
    }
}
