<?php

use App\ModelAndRepository\OrderStatuses\OrderStatus;
use Illuminate\Database\Seeder;

class OrderStatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderStatus::create(["name" => "shipping"]);
        OrderStatus::create(["name" => "shipped"]);
    }
}
