<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Tests\TestCase;
use App\ModelAndRepository\Orders\Order;
use App\ModelAndRepository\Products\Product;
use Illuminate\Foundation\Testing\WithFaker;
use App\ModelAndRepository\Prefectures\Prefecture;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_create_customer_and_card()
    {
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $card = json_decode($this->post("/api/payments", $data)->content(), true);
        $this->assertEquals("Visa", $card["brand"]);
    }

    /** @test */
    public function user_can_update_customer_and_card()
    {
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $card = json_decode($this->post("/api/payments", $data)->content(), true);

        $card_brand = $card["brand"];

        $data = [
            "token" => "tok_mastercard"
        ];
        $updated = json_decode($this->patch("/api/payments", $data)->content(), true);
        $this->assertEquals("MasterCard", $updated["brand"]);
        $this->assertNotEquals($card_brand, $updated["brand"]);
    }

    /** @test */
    public function error_when_invalid_token()
    {
        $user = $this->signIn();
        $data = [
            "token" => "dummy"
        ];

        $this->post("/api/payments", $data)->assertStatus(422)->assertJson(["errors" =>
        ["card" => ["No such token: 'dummy'"]]]);
    }

    //chargeAndOrderでチェックしたい項目は、orderが作られているか、orderとproductが紐づいているか、cartが空になっているか(database含む)
    //気を付けることは毎回chargeが残ったまま(こっちのDBとは別にある)なので毎回chargeをclearする必要があるかも
    /** @test */
    public function order_successfully_created()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $this->post("/api/payments", $data);
        $quantity = 1;
        $product = factory(Product::class)->create(["price" => 123400]);
        $this->cartRepo->addCartToList($product, $quantity);
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $address = $this->post("/api/addresses", $data);

        $cartInfoArray = $this->cartRepo->getTransfromedCartItems();
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $order = json_decode($this->post("/api/chargeAndOrder", ["currency" => "jpy"])->content(), true);

        $this->assertEquals($address["zip"], $order["address"]["zip"]);
        $this->assertEquals($orderStatus->name, $order["order_status"]);
        $this->assertEquals($cartInfoArray["total"], $order["total"]);
    }

    /** @test */
    public function order_successfully_attached_to_product()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $this->post("/api/payments", $data);
        $quantity = 1;
        $product = factory(Product::class)->create(["price" => 123400]);
        $this->cartRepo->addCartToList($product, $quantity);
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $address = $this->post("/api/addresses", $data);

        $cartInfoArray = $this->cartRepo->getTransfromedCartItems();
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $order = json_decode($this->post("/api/chargeAndOrder", ["currency" => "jpy"])->content(), true);

        $order = Order::where("id", $order["id"])->first();
        $this->assertEquals($product->name, $order->fresh()->buyproducts()->first()->name);
    }

    /** @test */
    public function successfuly_return_address()
    {
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $this->post("/api/payments", $data);
        $quantity = 1;
        $product = factory(Product::class)->create(["price" => 123400]);
        $this->cartRepo->addCartToList($product, $quantity);
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $address = json_decode($this->post("/api/addresses", $data)->content(), true);

        $cartInfoArray = $this->cartRepo->getTransfromedCartItems();
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $order = json_decode($this->post("/api/chargeAndOrder", ["currency" => "jpy"])->content(), true);
        $this->assertEquals($address["id"], $order["address"]["id"]);
        $this->assertEquals($address["address1"], $order["address"]["address1"]);
    }

    /** @test */
    public function successfuly_return_buyproductList()
    {
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $this->post("/api/payments", $data);
        $quantity = 1;
        $product = factory(Product::class)->create(["price" => 123400]);
        $this->cartRepo->addCartToList($product, $quantity);
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $address = json_decode($this->post("/api/addresses", $data)->content(), true);

        $cartInfoArray = $this->cartRepo->getTransfromedCartItems();
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $order = json_decode($this->post("/api/chargeAndOrder", ["currency" => "jpy"])->content(), true);
        $this->assertEquals($product->name, $order["buyProductList"][0]["name"]);
        $this->assertEquals($product->price, $order["buyProductList"][0]["price"]);
        $this->assertEquals("123,400", $order["buyProductList"][0]["subtotal"]);
        $this->assertEquals("1", $order["buyProductList"][0]["buyQuantity"]);
    }
    /** @test */
    public function successfuly_return_created_at()
    {
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $this->post("/api/payments", $data);
        $quantity = 1;
        $product = factory(Product::class)->create(["price" => 123400]);
        $this->cartRepo->addCartToList($product, $quantity);
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $address = json_decode($this->post("/api/addresses", $data)->content(), true);

        $cartInfoArray = $this->cartRepo->getTransfromedCartItems();
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $order = json_decode($this->post("/api/chargeAndOrder", ["currency" => "jpy"])->content(), true);
        $order_created_at = Order::where("id", $order["id"])->first()->created_at;

        $this->assertEquals((new Carbon($order_created_at))->toDateTimeString(), $order["created_at"]);
    }

    /** @test */
    public function successfuly_return_order_status_name()
    {
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $this->post("/api/payments", $data);
        $quantity = 1;
        $product = factory(Product::class)->create(["price" => 123400]);
        $this->cartRepo->addCartToList($product, $quantity);
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $address = json_decode($this->post("/api/addresses", $data)->content(), true);

        $cartInfoArray = $this->cartRepo->getTransfromedCartItems();
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $order = json_decode($this->post("/api/chargeAndOrder", ["currency" => "jpy"])->content(), true);
        dump($order);

        $this->assertEquals("shipping", $order["order_status"]);
    }

    //フロントの方でreduxもclear
    /** @test */
    public function successfuly_clearCart()
    {
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $this->post("/api/payments", $data);
        $quantity = 1;
        $product = factory(Product::class)->create(["price" => 123400]);
        $this->cartRepo->addCartToList($product, $quantity);
        $this->cartRepo->setShippingFee(500);
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $address = json_decode($this->post("/api/addresses", $data)->content(), true);

        $cartInfoArray = $this->cartRepo->getTransfromedCartItems();
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");

        $this->assertEquals(500, session()->get("shippingFee"));

        $order = json_decode($this->post("/api/chargeAndOrder", ["currency" => "jpy"])->content(), true);

        $cartlist = $this->get("/api/carts");
        $this->assertCount(0, $cartlist["cartItems"]);
        //shippingFeeだけは自分でsessionに入れたので消しているか確認する
        $this->assertEquals(0, session()->get("shippingFee"));
    }

    /** @test */
    public function error_when_amount_under_50()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        $data = [
            "token" => "tok_visa"
        ];
        $this->post("/api/payments", $data);
        $quantity = 1;
        $product = factory(Product::class)->create(["price" => 10]);
        $this->cartRepo->addCartToList($product, $quantity);
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $address = $this->post("/api/addresses", $data);

        $cartInfoArray = $this->cartRepo->getTransfromedCartItems();
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");


        $this->post("/api/chargeAndOrder", ["currency" => "jpy"])->assertStatus(422)->assertJson(["errors" =>
        ["card" => ["Amount must be at least ¥50 jpy"]]]);
    }
}
