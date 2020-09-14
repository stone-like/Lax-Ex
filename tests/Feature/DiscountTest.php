<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\ModelAndRepository\Admins\Admin;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DiscountTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permissioned_admin_can_create_discount()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createDiscount"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "discountCode" => "aaa",
            "discountPrice" => 100
        ];
        $this->post("/api/admin/discounts", $data);
        $this->assertDatabaseHas("discounts", ["discountCode" =>  "aaa"]);
    }
    /** @test */
    public function non_permissioned_admin_can_not_create_discount()
    {
        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createDiscount"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "discountCode" => "aaa",
            "discountPrice" => 100
        ];
        $this->post("/api/admin/discounts", $data)->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_delete_discount()
    {


        $discount = $this->discountRepo->createDiscount("aaa", 100);

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createDiscount"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $this->delete("/api/admin/discounts/" . $discount->id);
        $this->assertDatabaseMissing("discounts", ["discountCode" =>  "aaa"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_delete_discount()
    {


        $discount = $this->discountRepo->createDiscount("aaa", 100);

        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createDiscount"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->delete("/api/admin/discounts/" . $discount->id)->assertStatus(403);
    }

    /** @test */
    public function error_when_non_exist_discount_id()
    {


        $discount = $this->discountRepo->createDiscount("aaa", 100);

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createDiscount"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $this->delete("/api/admin/discounts/" . 6000000000)->assertSessionHasErrors("discount_id");
    }

    /** @test */
    public function permissioned_admin_can_get_all_discount()
    {


        $this->discountRepo->createDiscount("aaa", 100);
        $this->discountRepo->createDiscount("bbb", 100);


        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createDiscount"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $discountList = json_decode($this->get("/api/admin/discounts")->content(), true);

        $this->assertCount(2, $discountList);
    }

    /** @test */
    public function non_permissioned_admin_can_not_get_all_discount()
    {


        $discount = $this->discountRepo->createDiscount("aaa", 100);

        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createDiscount"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->get("/api/admin/discounts")->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_search_discount()
    {


        $this->discountRepo->createDiscount("aaa", 100);
        $this->discountRepo->createDiscount("abb", 100);
        $this->discountRepo->createDiscount("bbb", 100);



        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createDiscount"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "a"
        ];
        $discountList = json_decode($this->post("/api/admin/discounts/searchByName", $data)->content(), true);

        $this->assertCount(2, $discountList);
    }

    /** @test */
    public function non_permissioned_admin_can_not_search_discount()
    {


        $this->discountRepo->createDiscount("aaa", 100);
        $this->discountRepo->createDiscount("abb", 100);
        $this->discountRepo->createDiscount("bbb", 100);



        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createDiscount"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "a"
        ];
        $this->post("/api/admin/discounts/searchByName", $data)->assertStatus(403);
    }
}
