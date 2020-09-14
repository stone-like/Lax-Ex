<?php

use Illuminate\Database\Seeder;
use App\ModelAndRepository\Users\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class)->create(["name" => "test", "email" => "test@email.com"]);
    }
}
