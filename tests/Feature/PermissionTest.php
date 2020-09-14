<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\ModelAndRepository\Admins\Admin;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PermissionTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permissioned_admin_can_get_all_permission_except_superadmin_permission()
    {
        $admin = factory(Admin::class)->create();

        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        Permission::create(["name" => "createRoleAndPerm"]);
        $permList = json_decode($this->get("/api/admin/permissions")->content(), true);
        //permissionは今全部でcreateRoleAndPermとatatchRoleAndPermの二つでsuperAdminPermissionのcreateRoleAndPermを除いたatatchRoleAndPermだけほしい
        $this->assertCount(1, $permList);
    }

    /** @test */
    public function non_permissioned_admin_can_not_get_all_permission_except_superadmin_permission()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->get("/api/admin/permissions")->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_create_permission()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test"
        ];
        $this->post("/api/admin/permissions", $data);
        $this->assertDatabaseHas("permissions", ["name" => "test"]);
    }
    /** @test */
    public function non_permissioned_admin_can_not_create_permission()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test"
        ];
        $this->post("/api/admin/permissions", $data)->assertStatus(403);
    }

    /** @test */
    public function error_when_duplicated_permission_name()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test"
        ];
        $this->post("/api/admin/permissions", $data);

        $this->post("/api/admin/permissions", $data)->assertSessionHasErrors("name");
    }

    /** @test */
    public function permissioned_admin_can_update_permission()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test"
        ];
        $permission = json_decode($this->post("/api/admin/permissions", $data)->content(), true);
        $data = [
            "name" => "updated"
        ];
        $this->patch("/api/admin/permissions/" . $permission["id"], $data);

        $this->assertDatabaseMissing("permissions", ["name" => "test"]);
        $this->assertDatabaseHas("permissions", ["name" => "updated"]);
    }
    /** @test */
    public function non_permissioned_admin_can_not_update_permission()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $permission = Permission::create(["guard_name" => "admin", "name" => "test"]);
        $data = [
            "name" => "updated"
        ];
        $this->patch("/api/admin/permissions/" . $permission->id, $data)->assertStatus(403);
    }
    /** @test */
    public function error_when_invalid_permission_id()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test"
        ];
        $permission = json_decode($this->post("/api/admin/permissions", $data)->content(), true);
        $data = [
            "name" => "updated"
        ];
        $this->patch("/api/admin/permissions/6000000", $data)->assertSessionHasErrors("permission_id");
    }

    /** @test */
    public function error_when_duplicated_name_sent()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test"
        ];
        $permission = json_decode($this->post("/api/admin/permissions", $data)->content(), true);

        $data = [
            "name" => "createRoleAndPerm"
        ];
        $this->patch("/api/admin/permissions/" . $permission["id"], $data)->assertSessionHasErrors("name");
    }

    /** @test */
    public function ok_when_duplicated_name_is_own_permission_name()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test"
        ];
        $permission = json_decode($this->post("/api/admin/permissions", $data)->content(), true);

        $data = [
            "name" => "test"
        ];
        $this->patch("/api/admin/permissions/" . $permission["id"], $data)->assertStatus(200);
    }

    /** @test */
    public function permissioned_admin_can_delete_permission()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test"
        ];
        $permission = json_decode($this->post("/api/admin/permissions", $data)->content(), true);
        $data = [
            "name" => "updated"
        ];
        $this->delete("/api/admin/permissions/" . $permission["id"]);

        $this->assertDatabaseMissing("permissions", ["name" => "test"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_delete_permission()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $permission = Permission::create(["guard_name" => "admin", "name" => "test"]);
        $this->delete("/api/admin/permissions/" . $permission->id)->assertStatus(403);
    }
}
