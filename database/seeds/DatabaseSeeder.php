<?php


use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CategoryProductTableSeeder::class);
        $this->call(PermissionTableSeeder::class);
        $this->call(RoleTableSeeder::class);
        $this->call(RoleHasPermissionTableSeeder::class);
        $this->call(PrefectureTableSeeder::class);
        $this->call(AdminTableSeeder::class);
        $this->call(ShippingTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(DiscountTableSeeder::class);
        $this->call(OrderStatusTableSeeder::class);
        $this->call(NewsTableSeeder::class);
    }
}
