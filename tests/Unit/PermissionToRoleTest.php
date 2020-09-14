<?php

namespace Tests\Unit;

use Tests\TestCase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;



class PermissionToRoleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function role_can_be_assigned_permission()
    {
        $role = Role::create(["guard_name" => "admin", "name" => "testRole"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        $this->roleRepo->assignPermissions([$permission], $role->id);

        $this->assertTrue($role->hasPermissionTo("testPerm", "admin")); //hasPermissionToの第二引数はguardName
    }
    /** @test */
    public function role_can_be_removed_permission()
    {
        $role = Role::create(["guard_name" => "admin", "name" => "testRole"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        $this->roleRepo->assignPermissions([$permission], $role->id);

        $this->roleRepo->removePermissions([$permission], $role->id);

        $this->assertNotTrue($role->hasPermissionTo("testPerm", "admin")); //hasPermissionToの第二引数はguardName
    }
    /** @test */
    public function role_can_be_synced_permission()
    {
        $role = Role::create(["guard_name" => "admin", "name" => "testRole"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        $this->roleRepo->assignPermissions([$permission], $role->id);

        $permission = Permission::create(["guard_name" => "admin", "name" => "updated"]);
        $this->roleRepo->syncPermissions([$permission], $role->id);

        $this->assertNotTrue($role->hasPermissionTo("testPerm", "admin")); //hasPermissionToの第二引数はguardName
        $this->assertTrue($role->hasPermissionTo("updated", "admin")); //hasPermissionToの第二引数はguardName

    }
}
