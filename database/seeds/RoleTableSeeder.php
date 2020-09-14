<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            "superadmin",
            "admin",
            "staff",
            
        ];
        foreach($roles as $role){
            Role::create(["guard_name"=>"admin","name" => $role]);
        }
    }
}
