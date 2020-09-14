<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Exceptions\DiscountNotFoundException;
use App\ModelAndRepository\Discounts\Discount;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Exceptions\HttpResponseException;



class DiscountTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_get_discount_price_when_code_is_perfectly_matched()
    {
        Discount::create(["discountCode" => "dummy1", "discountPrice" => 100]);
        Discount::create(["discountCode" => "dummy2", "discountPrice" => 200]);
        $discount = $this->discountRepo->findDiscountByDiscountCode("dummy1");
        $this->assertEquals(100, $discount->discountPrice);
    }


    /** @test */
    public function error_when_code_is_partially_matched()
    {
        $this->expectException(HttpResponseException::class);
        Discount::create(["discountCode" => "dummy1", "discountPrice" => 100]);
        Discount::create(["discountCode" => "dummy2", "discountPrice" => 200]);
        $this->discountRepo->findDiscountByDiscountCode("dum");
    }

    /** @test */
    public function it_can_get_discount_by_name_for_admin()
    {
        Discount::create(["discountCode" => "dummy1", "discountPrice" => 100]);
        Discount::create(["discountCode" => "dummy2", "discountPrice" => 200]);
        $discountList = $this->discountRepo->searchByName("y1");
        $this->assertCount(1, $discountList);
    }
    /** @test */
    public function it_can_get_all_discount_for_admin()
    {
        Discount::create(["discountCode" => "dummy1", "discountPrice" => 100]);
        Discount::create(["discountCode" => "dummy2", "discountPrice" => 200]);
        $discountList = $this->discountRepo->getAllDiscount();
        $this->assertCount(2, $discountList);
    }
}
