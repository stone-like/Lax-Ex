<?php

namespace Tests\Feature;

use Tests\TestCase;
use Spatie\Permission\Models\Role;
use App\ModelAndRepository\Admins\Admin;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permissioned_admin_can_assign_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $testStaff = factory(Admin::class)->create();
        $role = $this->roleRepo->findRoleByName("staff");
        $data = [
            "admin_id" => $testStaff->id,
            "role_id" => $role->id
        ];
        $this->post("/api/admin/assignroles", $data);
        $this->assertTrue($testStaff->hasRole("staff"));
    }
    /** @test */
    public function non_permissioned_admin_can_not_assign_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $testStaff = factory(Admin::class)->create();
        $role = $this->roleRepo->findRoleByName("staff");

        $data = [
            "admin_id" => $testStaff->id,
            "role_id" => $role->id
        ];
        $this->post("/api/admin/assignroles", $data);
        $this->assertFalse($testStaff->hasRole("staff"));
    }
    /** @test */
    public function permissioned_admin_can_remove_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $testStaff = factory(Admin::class)->create();
        $role = $this->roleRepo->findRoleByName("staff");
        $data = [
            "admin_id" => $testStaff->id,
            "role_id" => $role->id
        ];
        $this->post("/api/admin/assignroles", $data);

        $this->assertTrue($testStaff->fresh()->hasRole("staff"));

        $this->post("/api/admin/removeroles", $data);
        $this->assertFalse($testStaff->fresh()->hasRole("staff"));
    }

    /** @test */
    public function non_permissioned_admin_can_not_remove_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $testStaff = factory(Admin::class)->create();
        $staffRole = $this->roleRepo->findRoleByName("staff");
        $testStaff->assignRole(["guard_nane" => "admin", "name" => "staff"]);


        $this->assertTrue($testStaff->fresh()->hasRole("staff"));

        $data = [
            "admin_id" => $testStaff->id,
            "role_id" => $staffRole->id
        ];
        $this->post("/api/admin/removeroles", $data)->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_sync_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $testStaff = factory(Admin::class)->create();
        $role = $this->roleRepo->findRoleByName("staff");

        $data = [
            "admin_id" => $testStaff->id,
            "role_id" => $role->id
        ];
        $this->post("/api/admin/assignroles", $data);

        $this->assertTrue($testStaff->fresh()->hasRole("staff"));
        $role = $this->roleRepo->findRoleByName("admin");

        $data = [
            "admin_id" => $testStaff->id,
            "role_id" => $role->id
        ];
        $this->post("/api/admin/syncroles", $data);
        $this->assertTrue($testStaff->fresh()->hasRole("admin"));
    }

    /** @test */
    public function non_permissioned_admin_can_not_sync_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $testStaff = factory(Admin::class)->create();
        $staffRole = $this->roleRepo->findRoleByName("staff");
        $testStaff->assignRole(["guard_nane" => "admin", "name" => "staff"]);


        $this->assertTrue($testStaff->fresh()->hasRole("staff"));

        $data = [
            "admin_id" => $testStaff->id,
            "role_id" => $staffRole->id
        ];

        $role = $this->roleRepo->findRoleByName("admin");

        $data = [
            "admin_id" => $testStaff->id,
            "role_id" => $role->id
        ];
        $this->post("/api/admin/syncroles", $data)->assertStatus(403);
    }

    //formRequestのときvalidationErrorを上書きしてもいいかも（今は上書きしてないので302）

    /** @test */
    public function admin_can_not_assign_superadmin()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $testStaff = factory(Admin::class)->create();
        $role = $this->roleRepo->findRoleByName("superadmin");

        $data = [
            "admin_id" => $testStaff->id,
            "role_id" => $role->id
        ];
        $this->post("/api/admin/assignroles", $data)->assertStatus(302);
    }

    /** @test */
    public function permissioned_admin_can_make_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $data = [
            "name" => "test1"
        ];
        $this->post("api/admin/roles", $data);
        $this->assertDatabaseHas("roles", ["name" => "test1", "guard_name" => "admin"]);
    }

    /** @test */
    public function permissioned_admin_can_udpate_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $data = [
            "name" => "test1"
        ];
        $role = $this->post("api/admin/roles", $data);

        $data = [
            "name" => "updatedTest"
        ];
        $this->patch("/api/admin/roles/" . $role["data"]["id"], $data);
        $this->assertDatabaseHas("roles", ["name" => "updatedTest"]);
    }

    /** @test */
    public function error_when_update_duplicated_role_name()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $data = [
            "name" => "test1"
        ];
        $role = $this->post("api/admin/roles", $data);

        $data = [
            "name" => "superadmin"
        ];
        $this->patch("/api/admin/roles/" . $role["data"]["id"], $data)->assertSessionHasErrors("name");
    }

    /** @test */
    public function error_when_invalid_role_id_sent()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $data = [
            "name" => "test1"
        ];
        $role = $this->post("api/admin/roles", $data);

        $data = [
            "name" => "dummy"
        ];
        $this->patch("/api/admin/roles/" . 50000000000, $data)->assertSessionHasErrors("role_id");
    }

    /** @test */
    public function permissioned_admin_can_delete_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $data = [
            "name" => "test1"
        ];
        $role = $this->post("api/admin/roles", $data);


        $this->delete("/api/admin/roles/" . $role["data"]["id"]);
        $this->assertDatabaseMissing("roles", ["name" => "test1"]);
    }

    /** @test */
    public function permissioned_admin_can_get_all_role_except_super_admin()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        Role::create(["name" => "test1"]);
        //しっかりpermissionが振られていないroleも取得できるか？

        $roleList = json_decode($this->get("api/admin/roles")->content(), true);
        //resourceを通しているので一回dataを挟まなければだめ
        $this->assertNotContains("superadmin", array_column($roleList["data"], "name"));
        $this->assertContains("test1", array_column($roleList["data"], "name"));
    }

    /** @test */
    public function admin_can_get_all_admin_except_super_admin()
    {
        $admin = factory(Admin::class)->create(["name" => "superadmin"]);
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"], "superadmin");
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $ad1 = factory(Admin::class)->create(["name" => "admin"]);
        $ad1->assignRole("admin");
        $ad2 = factory(Admin::class)->create(["name" => "staff"]);
        $ad2->assignRole("staff");
        $ad3 = factory(Admin::class)->create(["name" => "no_role"]);

        $adminList = json_decode($this->get("api/admin/admins")->content(), true);
        $this->assertNotContains("superadmin", array_column($adminList, "name"));
    }

    /** @test */
    public function can_searchByNameExceptSuperAdmin()
    {
        $this->withoutExceptionHandling();
        $admin = factory(Admin::class)->create(["name" => "superadmin"]);
        $role = $this->createRoleAssignTargetPermission(["attachRoleAndPerm"], "superadmin"); //ここではsuperadminRoleがついてるadminを除外したいのでroleNameをsuperadminにしている
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $ad1 = factory(Admin::class)->create(["name" => "admin"]);
        $ad1->assignRole("admin");
        $ad2 = factory(Admin::class)->create(["name" => "staff"]);
        $ad2->assignRole("admin");
        $ad3 = factory(Admin::class)->create(["name" => "no_role"]);

        $adminList = json_decode($this->post("api/admin/admins/searchByName", ["name" => "admin"])->content(), true);
        $this->assertCount(1, $adminList);
    }

    //↓はroleBasedのtest
    // /** @test */
    // public function admin_can_not_make_role()
    // {
    //     $admin = factory(Admin::class)->create();
    //     $admin->assignRole("admin");
    //     $this->adminSignIn($admin);


    //     $data = [
    //         "names" => "test"
    //     ];

    //     $this->post("/api/admin/roles", $data)->assertStatus(403);
    // }

    // /** @test */
    // public function superadmin_can_make_permission()
    // {

    //     $admin = factory(Admin::class)->create();
    //     $admin->assignRole("superadmin");
    //     $this->adminSignIn($admin);

    //     $data = [
    //         "name" => "test"
    //     ];
    //     $this->post("/api/admin/permissions", $data);


    //     $this->assertDatabaseHas("permissions", ["name" => "test", "guard_name" => "admin"]);
    // }


    // /** @test */
    // public function superadmin_can_attach_permission_to_role()
    // {

    //     $admin = factory(Admin::class)->create();
    //     $admin->assignRole("superadmin");
    //     $this->adminSignIn($admin);


    //     $data = [
    //         "name" => "test"
    //     ];

    //     $this->post("/api/admin/roles", $data);

    //     $data = [
    //         "name" => "testPerm1"
    //     ];
    //     $this->post("/api/admin/permissions", $data);
    //     $data = [
    //         "name" => "testPerm2"
    //     ];
    //     $this->post("/api/admin/permissions", $data);

    //     $permissions = [
    //         "testPerm1",
    //         "testPerm2"
    //     ];

    //     $data = [
    //         "permissions" => $permissions,
    //         "roleName" => "test"
    //     ];
    //     $this->post("/api/admin/attachpermissions", $data);

    //     $role = Role::where("name", "test")->first();

    //     foreach ($role->permissions as $permission) {
    //         $this->assertContains($permission->name, $permissions);
    //     }
    // }
}
