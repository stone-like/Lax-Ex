<?php

namespace Tests\Unit;

use App\Exceptions\OrderStatusNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class OrderStatusTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_find_by_name_when_name_perfectly_matched()
    {
        //事前にshippingとshippedの二つを作ってある
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipped");
        $this->assertEquals("shipped", $orderStatus->name);
    }
    /** @test */
    public function it_can_not_find_by_name_when_name_pertially_matched()
    {
        $this->expectException(OrderStatusNotFoundException::class);
        //事前にshippingとshippedの二つを作ってある
        $orderStatusList = $this->orderStatusRepo->findOrderStatusByName("ship");
    }
    /** @test */
    public function can_create_order_status()
    {
        $this->orderStatusRepo->createOrderStatus("dummy");
        $this->assertDatabaseHas("order_statuses", ["name" => "dummy"]);
    }
    /** @test */
    public function can_delete_order_status()
    {
        $order = $this->orderStatusRepo->createOrderStatus("dummy");
        $this->assertDatabaseHas("order_statuses", ["name" => "dummy"]);
        $this->orderStatusRepo->deleteOrderStatus($order->id);
        $this->assertDatabaseMissing("order_statuses", ["name" => "dummy"]);
    }

    /** @test */
    public function can_get_all_order_status()
    {
        $orderList = $this->orderStatusRepo->getAllOrderStatus();
        $this->assertCount(2, $orderList);
    }

    /** @test */
    public function can_search_order_status()
    {
        $orderList = $this->orderStatusRepo->searchByName("ing");
        $this->assertCount(1, $orderList);
    }
}
