<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\DTO\Carts\CartDTO;
use App\ModelAndRepository\Users\User;
use App\ModelAndRepository\Admins\Admin;
use Illuminate\Foundation\Testing\WithFaker;
use App\ModelAndRepository\Addresses\Address;
use App\ModelAndRepository\Prefectures\Prefecture;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_get_user_order()
    {
        $user = $this->signIn();

        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $address = $this->addressRepo->createAddress($data);
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipped");

        $order = $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);
        foreach ($cartInfoArray["cartItems"] as $cartItem) {
            // $product = $this->proRepo->findProductBySlug(Str::slug($cartItem["name"]));
            //buyProductに購入した商品の情報を保存
            $buyProduct = $this->buyProRepo->createBuyProduct($cartItem);
            $this->orderRepo->attachProduct($order, $buyProduct);
        }


        $orderInfoArrayList = json_decode($this->get("/api/orders")->content(), true);
        //しっかり単純なorderからaddress、buyProduct、orderStatusに変換されていることを確かめる
        $this->assertEquals($order->id, $orderInfoArrayList[0]["id"]);
        $this->assertEquals($address["zip"], $orderInfoArrayList[0]["address"]["zip"]);
        $this->assertEquals($orderStatus->name, $orderInfoArrayList[0]["order_status"]);
        $this->assertEquals($cartInfoArray["total"], $orderInfoArrayList[0]["total"]);
        $this->assertEquals($this->testProduct->name, $orderInfoArrayList[0]["buyProductList"][0]["name"]);
    }

    /** @test */
    public function guest_can_not_get_user_order()
    {
        // $user = $this->signIn();
        $user = factory(User::class)->create();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
            "user_id" => $user->id
        ];

        $address = Address::create($data);
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipped");


        $order = $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $this->get("/api/orders")->assertStatus(422);
    }

    /** @test */
    public function permissioned_admin_can_get_all_order()
    {
        $user = factory(User::class)->create();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
            "user_id" => $user->id
        ];

        $address = Address::create($data);
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipped");


        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["updateOrder"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $orderList = json_decode($this->get("/api/admin/orders")->content(), true);
        $this->assertCount(1, $orderList);
    }
    /** @test */
    public function non_permissioned_admin_can_not_get_all_order()
    {
        $user = factory(User::class)->create();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
            "user_id" => $user->id
        ];

        $address = Address::create($data);
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipped");


        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $admin = factory(Admin::class)->create();
        //  $role = $this->createRoleAssignTargetPermission(["updateOrder"]);
        //  $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->get("/api/admin/orders")->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_update_order()
    {
        $user = factory(User::class)->create();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
            "user_id" => $user->id
        ];

        $address = Address::create($data);
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipped");


        $order = $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["updateOrder"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $orderStatusShipping = $this->orderStatusRepo->findOrderStatusByName("shipping");
        $data = [
            "order_status_id" => $orderStatusShipping->id
        ];
        $this->patch("/api/admin/orders/" . $order->id, $data);
        $this->assertNotNull($order->fresh()->shipped_at);
        $this->assertEquals($orderStatusShipping->id, $order->fresh()->order_status_id);
    }
    /** @test */
    public function non_permissioned_admin_can_not_update_order()
    {
        $user = factory(User::class)->create();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
            "user_id" => $user->id
        ];

        $address = Address::create($data);
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipped");


        $order = $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["updateOrder"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $orderStatusShipping = $this->orderStatusRepo->findOrderStatusByName("shipping");
        $data = [

            "order_status_id" => $orderStatusShipping->id
        ];
        $this->patch("/api/admin/orders/" . $order->id, $data)->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_find_order_by_order_status_id()
    {
        $user = factory(User::class)->create();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
            "user_id" => $user->id
        ];

        $address = Address::create($data);
        $orderStatusShipped = $this->orderStatusRepo->findOrderStatusByName("shipped");
        $orderStatusShipping = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatusShipped->id);
        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatusShipping->id);


        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["updateOrder"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "order_status_id" => $orderStatusShipping->id
        ];
        $orderList = json_decode($this->post("/api/admin/orders/findByOrderStatus", $data)->content(), true);
        $this->assertCount(1, $orderList);
    }

    /** @test */
    public function non_permissioned_admin_can_not_find_order_by_order_status_id()
    {
        $user = factory(User::class)->create();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
            "user_id" => $user->id
        ];

        $address = Address::create($data);
        $orderStatusShipped = $this->orderStatusRepo->findOrderStatusByName("shipped");
        $orderStatusShipping = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatusShipped->id);
        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatusShipping->id);


        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["updateOrder"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "order_status_id" => $orderStatusShipping->id
        ];
        $this->post("/api/admin/orders/findByOrderStatus", $data)->assertStatus(403);
    }

    /** @test */
    public function error_when_invalid_order_status_id()
    {
        $user = factory(User::class)->create();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
            "user_id" => $user->id
        ];

        $address = Address::create($data);
        $orderStatusShipped = $this->orderStatusRepo->findOrderStatusByName("shipped");
        $orderStatusShipping = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatusShipped->id);
        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatusShipping->id);


        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["updateOrder"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "order_status_id" => 500000000
        ];
        $this->post("/api/admin/orders/findByOrderStatus", $data)->assertSessionHasErrors("order_status_id");
    }
}
