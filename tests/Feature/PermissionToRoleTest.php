<?php

namespace Tests\Feature;

use Tests\TestCase;
use Spatie\Permission\Models\Role;
use App\ModelAndRepository\Admins\Admin;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PermissionToRoleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permissioned_admin_can_assign_permission_to_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $role = Role::create(["guard_name" => "admin", "name" => "test"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        $this->post("/api/admin/assignpermissions", ["permission_ids" => [$permission->id], "role_id" => $role->id]);
        $this->assertTrue($role->hasPermissionTo("testPerm", "admin"));
    }
    /** @test */
    public function non_permissioned_admin_can_not_assign_permission_to_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $role = Role::create(["guard_name" => "admin", "name" => "test"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        $this->post("/api/admin/assignpermissions", ["permission_ids" => [$permission->id], "role_id" => $role->id])->assertStatus(403);
    }
    /** @test */
    public function error_when_invalid_role_id()
    {
        $admin = factory(Admin::class)->create();

        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $role = Role::create(["guard_name" => "admin", "name" => "test"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        //faildValidationでerrorを変えているためtestも特殊
        $this->post("/api/admin/assignpermissions", ["permission_ids" => [$permission->id], "role_id" => 600000])->assertStatus(422)->assertJson(["errors" => [
            "role_id" => "this role_id is invalid"
        ]]);
    }

    /** @test */
    public function error_when_invalid_permission_ids()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $role = Role::create(["guard_name" => "admin", "name" => "test"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        //faildValidationでerrorを変えているためtestも特殊
        $this->post("/api/admin/assignpermissions", ["permission_ids" => [7000000, 40000], "role_id" => $role->id])->assertStatus(422)->assertJson(["errors" => [
            "permission_id" => "these permission Ids is invalid"
        ]]);
    }

    /** @test */
    public function permissioned_admin_can_remove_permission_to_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $role = Role::create(["guard_name" => "admin", "name" => "test"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        $this->post("/api/admin/assignpermissions", ["permission_ids" => [$permission->id], "role_id" => $role->id]);
        $this->assertTrue($role->hasPermissionTo("testPerm", "admin"));
        $this->post("/api/admin/removepermissions", ["permission_ids" => [$permission->id], "role_id" => $role->id]);

        $this->assertNotTrue($role->fresh()->hasPermissionTo("testPerm", "admin"));
    }
    /** @test */
    public function non_permissioned_admin_can_not_remove_permission_to_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $role = Role::create(["guard_name" => "admin", "name" => "test"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        $this->post("/api/admin/removepermissions", ["permission_ids" => [$permission->id], "role_id" => $role->id])->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_sync_permission_to_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $role = Role::create(["guard_name" => "admin", "name" => "test"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        $permission2 = Permission::create(["guard_name" => "admin", "name" => "updatedPerm"]);
        $this->post("/api/admin/assignpermissions", ["permission_ids" => [$permission->id], "role_id" => $role->id]);
        $this->assertTrue($role->hasPermissionTo("testPerm", "admin"));
        $this->post("/api/admin/syncpermissions", ["permission_ids" => [$permission2->id], "role_id" => $role->id]);

        $this->assertNotTrue($role->fresh()->hasPermissionTo("testPerm", "admin"));
        $this->assertTrue($role->fresh()->hasPermissionTo("updatedPerm", "admin"));
    }
    /** @test */
    public function non_permissioned_admin_can_not_sync_permission_to_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $role = Role::create(["guard_name" => "admin", "name" => "test"]);
        $permission = Permission::create(["guard_name" => "admin", "name" => "testPerm"]);

        $this->post("/api/admin/syncpermissions", ["permission_ids" => [$permission->id], "role_id" => $role->id])->assertStatus(403);
    }
}
