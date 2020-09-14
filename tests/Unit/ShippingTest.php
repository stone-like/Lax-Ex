<?php

namespace Tests\Unit;

use App\Exceptions\ShippingNotFoundException;
use App\ModelAndRepository\Shippings\Shipping;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class ShippingTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_find_shipping_by_price()
    {
        $this->shippingRepo->createShipping("premier", 500);
        $shipping = $this->shippingRepo->findShippingByPrice(500);
        $this->assertEquals("premier", $shipping->name);
    }

    /** @test */
    public function exception_when_non_existing_price_set()
    {
        $this->expectException(ShippingNotFoundException::class);
        $this->shippingRepo->createShipping("premier", 500);
        $shipping = $this->shippingRepo->findShippingByPrice(700);
    }
}
