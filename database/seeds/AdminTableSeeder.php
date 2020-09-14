<?php

use Illuminate\Database\Seeder;
use App\ModelAndRepository\Admins\Admin;


class AdminTableSeeder extends Seeder
{
    public function run()
    {
        factory(Admin::class)->create(["name" => "superadmin", "email" => "superadmin@email.com"])->assignRole("superadmin");
        factory(Admin::class)->create(["name" => "admin", "email" => "admin@email.com"])->assignRole("admin");
        factory(Admin::class)->create(["name" => "staff", "email" => "staff@email.com"])->assignRole("staff");
    }
}
