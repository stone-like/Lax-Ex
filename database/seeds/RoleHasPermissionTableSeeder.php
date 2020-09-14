<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleHasPermissionTableSeeder extends Seeder
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

        $role = Role::findByName("superadmin", "admin");
        $role->givePermissionTo($permissions);

        $permissions = [
            "createCategory",
            "createProduct",
            "createDiscount",
            "createShipping",
            "updateOrder",
            "createOrderStatus",
            "createNews",
            "changeUser",
            "attachRoleAndPerm",
            "createAdmin",
        ];
        $role = Role::findByName("admin", "admin");
        $role->givePermissionTo($permissions);
        $permissions = [
            "createCategory",
            "createProduct",
            "createDiscount",
            "createShipping",
            "createOrderStatus",
            "createNews",
            "updateOrder",
            "changeUser",
        ];
        $role = Role::findByName("staff", "admin");
        $role->givePermissionTo($permissions);
    }
}
