<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\ModelAndRepository\Admins\Admin;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ShippingTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permissioned_admin_can_create_shipping()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy",
            "price" => 100
        ];
        $this->post("/api/admin/shippings", $data);
        $this->assertDatabaseHas("shippings", ["name" => "dummy"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_create_shipping()
    {
        $admin = factory(Admin::class)->create();
        //  $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        //  $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy",
            "price" => 100
        ];
        $this->post("/api/admin/shippings", $data)->assertStatus(403);
    }

    /** @test */
    public function error_when_duplicated_name()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy",
            "price" => 100
        ];
        $this->post("/api/admin/shippings", $data);
        $this->post("/api/admin/shippings", $data)->assertSessionHasErrors("name");
    }

    /** @test */
    public function permissioned_admin_can_update_shipping()
    {
        $shipping = $this->shippingRepo->createShipping("dummy", 100);


        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "updated",
            "price" => 100
        ];
        $this->patch("/api/admin/shippings/" . $shipping->id, $data);
        $this->assertDatabaseHas("shippings", ["name" => "updated"]);
        $this->assertDatabaseMissing("shippings", ["name" => "dummy"]);
    }
    /** @test */
    public function non_permissioned_admin_can_not_update_shipping()
    {
        $shipping = $this->shippingRepo->createShipping("dummy", 100);


        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "updated",
            "price" => 100
        ];
        $this->patch("/api/admin/shippings/" . $shipping->id, $data)->assertStatus(403);
    }

    /** @test */
    public function error_when_update_duplicated_name()
    {
        $shipping = $this->shippingRepo->createShipping("dummy", 100);
        $shipping2 = $this->shippingRepo->createShipping("dummy2", 100);



        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy2",
            "price" => 100
        ];
        $this->patch("/api/admin/shippings/" . $shipping->id, $data)->assertSessionHasErrors("name");
    }

    /** @test */
    public function ok_when_update_duplicated_own_name()
    {
        $shipping = $this->shippingRepo->createShipping("dummy", 100);
        $shipping2 = $this->shippingRepo->createShipping("dummy2", 100);



        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy",
            "price" => 500
        ];
        $this->patch("/api/admin/shippings/" . $shipping->id, $data)->assertStatus(200);
    }

    /** @test */
    public function error_when_invalid_shipping_id()
    {
        $shipping = $this->shippingRepo->createShipping("dummy", 100);


        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "updated",
            "price" => 100
        ];
        $this->patch("/api/admin/shippings/600000", $data)->assertSessionHasErrors("shipping_id");
    }

    /** @test */
    public function permissioned_admin_can_delete_shipping()
    {
        $shipping = $this->shippingRepo->createShipping("dummy", 100);


        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->delete("/api/admin/shippings/" . $shipping->id);

        $this->assertDatabaseMissing("shippings", ["name" => "dummy"]);
    }
    /** @test */
    public function non_permissioned_admin_can_not_delete_shipping()
    {
        $shipping = $this->shippingRepo->createShipping("dummy", 100);


        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->delete("/api/admin/shippings/" . $shipping->id)->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_get_all_shipping()
    {
        $this->shippingRepo->createShipping("dummy", 100);
        $this->shippingRepo->createShipping("dummy2", 100);
        $this->shippingRepo->createShipping("ccc", 100);




        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $shippingList = json_decode($this->get("/api/admin/shippings")->content(), true);
        $this->assertCount(3, $shippingList);
    }
    /** @test */
    public function non_permissioned_admin_can_not_get_all_shipping()
    {
        $this->shippingRepo->createShipping("dummy", 100);
        $this->shippingRepo->createShipping("dummy2", 100);
        $this->shippingRepo->createShipping("ccc", 100);




        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->get("/api/admin/shippings")->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_serach_shipping()
    {
        $this->shippingRepo->createShipping("dummy", 100);
        $this->shippingRepo->createShipping("dummy2", 100);
        $this->shippingRepo->createShipping("ccc", 100);




        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy"
        ];
        $shippingList = json_decode($this->post("/api/admin/shippings/searchByName", $data)->content(), true);
        $this->assertCount(2, $shippingList);
    }

    /** @test */
    public function non_permissioned_admin_can_not_serach_shipping()
    {
        $this->shippingRepo->createShipping("dummy", 100);
        $this->shippingRepo->createShipping("dummy2", 100);
        $this->shippingRepo->createShipping("ccc", 100);




        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createShipping"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy"
        ];
        $this->post("/api/admin/shippings/searchByName", $data)->assertStatus(403);
    }

    /** @test */
    public function user_can_get_all_shipping_and_defaultValue()
    {
        $this->signIn();
        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];

        $this->post("/api/carts", $data);
        $this->shippingRepo->createShipping("dummy", 100);
        $shipping = $this->shippingRepo->createShipping("premier", 300);
        $data = [
            "shipping_id" => $shipping->id
        ];
        $this->post("/api/cartShippings", $data);


        //この時defaultValueが二個目に作ったpremierのid=2ならok
        $shippingInfoArray = json_decode($this->get("/api/shippings")->content(), true);
        $this->assertEquals($shipping->id, $shippingInfoArray["defaultValue"]);
        $this->assertCount(2, $shippingInfoArray["shippingList"]);
    }
}
