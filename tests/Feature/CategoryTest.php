<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\ModelAndRepository\Users\User;
use App\ModelAndRepository\Admins\Admin;
use Illuminate\Foundation\Testing\WithFaker;
use App\Exceptions\CategoryNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permissioned_admin_can_create_category()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";
        $category = [
            "name" => $name
        ];

        $role = $this->createRoleAssignTargetPermission(["createCategory"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //staffでログイン
        $this->post("/api/admin/categories", $category);
        $this->assertDatabaseHas("categories", ["name" => $name]);
    }


    /** @test */
    public function unauthorized_admin_can_not_create_category()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";
        $category = [
            "name" => $name
        ];

        $this->adminSignIn($admin); //roleなしでログイン
        $this->post("/api/admin/categories", $category)->assertStatus(403);
    }

    /** @test */
    public function can_not_create_duplicated_category_name()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";
        $category = [
            "name" => $name
        ];

        $role = $this->createRoleAssignTargetPermission(["createCategory"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //staffでログイン
        $this->post("/api/admin/categories", $category);
        $this->post("/api/admin/categories", $category)->assertSessionHasErrors("name"); //重複
    }

    /** @test */
    public function permissioned_admin_can_update_category()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";
        $data = [
            "name" => $name
        ];

        $role = $this->createRoleAssignTargetPermission(["createCategory"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //staffでログイン
        $category = $this->post("/api/admin/categories", $data);
        //controllerから帰ってくると、modelではなくjsonになっているので$category["id"]としなければいけないことに注意

        $id = $category["id"];
        $data = [
            "name" => "updated"
        ];
        $this->patch("/api/admin/categories/" . $id, $data);
        $this->assertDatabaseHas("categories", ["name" => "updated"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_update_category()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        //testCaseであらかじめ作っておいたcategoryを使う
        $id = $this->testCategory["id"];
        $data = [
            "name" => $this->testCategory["name"]
        ];
        $this->patch("/api/admin/categories/" . $id, $data)->assertStatus(403);
    }

    /** @test */
    public function can_not_update_to_duplicatedName()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createCategory"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        //testCaseであらかじめ作っておいたcategoryを使う
        $id = $this->testCategory["id"];
        $data = [
            "name" => $this->testCategory["name"]
        ];
        $this->patch("/api/admin/categories/" . $id, $data)->assertStatus(302);
    }


    /** @test */
    public function permissioned_admin_can_delete_category()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";
        $data = [
            "name" => $name
        ];

        $role = $this->createRoleAssignTargetPermission(["createCategory"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $category = $this->post("/api/admin/categories", $data);
        //controllerから帰ってくると、modelではなくjsonになっているので$category["id"]としなければいけないことに注意

        $id = $category["id"];
        $this->delete("/api/admin/categories/" . $id);
        $this->assertDatabaseMissing("categories", ["name" => "dummy"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_delete_category()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        //testCaseであらかじめ作っておいたcategoryを使う
        $id = $this->testCategory["id"];
        $this->delete("/api/admin/categories/" . $id)->assertStatus(403);
    }
}
