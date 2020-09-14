<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            "createCategory",
            "createAdmin",
            "createProduct",
            "createDiscount",
            "createShipping",
            "updateOrder",
            "createOrderStatus",
            "createNews",
            "changeUser",
            "createRoleAndPerm",
            "attachRoleAndPerm",
        ];
        foreach ($permissions as $permission) {
            Permission::create(["guard_name" => "admin", "name" => $permission]);
        }
    }
}
