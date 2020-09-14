<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\ModelAndRepository\Admins\Admin;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderStatusTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permission_admin_can_create_order_status()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createOrderStatus"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy"
        ];
        $this->post("/api/admin/orderStatuses", $data);
        $this->assertDatabaseHas("order_statuses", ["name" => "dummy"]);
    }
    /** @test */
    public function non_permission_admin_can_not_create_order_status()
    {
        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createOrderStatus"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy"
        ];
        $this->post("/api/admin/orderStatuses", $data)->assertStatus(403);
    }

    /** @test */
    public function error_when_duplicated_status_name()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createOrderStatus"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "dummy"
        ];
        $this->post("/api/admin/orderStatuses", $data);
        $this->post("/api/admin/orderStatuses", $data)->assertSessionHasErrors("name");
    }

    /** @test */
    public function permission_admin_can_delete_order_status()
    {
        $this->withoutExceptionHandling();
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createOrderStatus"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->assertDatabaseHas("order_statuses", ["name" => "shipping"]);
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");
        $this->delete("/api/admin/orderStatuses/" . $orderStatus->id);
        $this->assertDatabaseMissing("order_statuses", ["name" => "shipping"]);
    }
    /** @test */
    public function non_permission_admin_can_not_delete_order_status()
    {
        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createOrderStatus"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->assertDatabaseHas("order_statuses", ["name" => "shipping"]);
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");
        $this->delete("/api/admin/orderStatuses/" . $orderStatus->id)->assertStatus(403);
    }

    /** @test */
    public function error_when_invalid_order_status()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createOrderStatus"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");
        $this->delete("/api/admin/orderStatuses/" . 600000)->assertSessionHasErrors("order_status_id");
    }

    /** @test */
    public function permission_admin_can_search_order_status()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createOrderStatus"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "ing"
        ];

        $orderStatusList = json_decode($this->post("/api/admin/orderStatuses/searchByName", $data)->content(), true);
        $this->assertCount(1, $orderStatusList);
    }

    /** @test */
    public function non_permission_admin_can_not_search_order_status()
    {
        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createOrderStatus"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "ing"
        ];

        $this->post("/api/admin/orderStatuses/searchByName", $data)->assertStatus(403);
    }
}
