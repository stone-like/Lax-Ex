<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\DTO\Carts\CartDTO;
use Illuminate\Support\Str;
use App\ModelAndRepository\Prefectures\Prefecture;
use Illuminate\Foundation\Testing\RefreshDatabase;



class OrderTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_order()
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
        $this->assertEquals($user->id, $order->user_id);
        $this->assertEquals($address->id, $order->address_id);
        $this->assertEquals($orderStatus->id, $order->order_status_id);
        $this->assertEquals($cartInfoArray["total"], $order->total);
    }



    /** @test */
    public function get_user_order()
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

        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $user = $this->signIn();
        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $orderList = $this->orderRepo->getUserOrder($user->id);
        $this->assertCount(1, $orderList);
    }

    /** @test */
    public function get_all_order()
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

        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $user = $this->signIn();
        $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $orderList = $this->orderRepo->getAllOrder();
        $this->assertCount(2, $orderList);
    }

    /** @test */
    public function can_update_order()
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
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");

        $this->orderRepo->updateOrder($order->id, "2020-01-01 00:01:00", $orderStatus->id);
        $this->assertEquals("2020-01-01 00:01:00", $order->fresh()->shipped_at);
        $this->assertEquals($orderStatus->id, $order->fresh()->order_status_id);
    }

    /** @test */
    public function can_find_order_by_order_status()
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

        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");
        $order = $this->orderRepo->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);

        $orderList = $this->orderRepo->findOrderByOrderStatusId($orderStatus->id);

        $this->assertCount(1, $orderList);
    }
}
