<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\ModelAndRepository\Products\Product;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_can_add_cart()
    {
        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];
        $postedCart = json_decode($this->post("/api/carts", $data)->content(), true);
        $this->assertEquals("10", $postedCart["cartItems"][0]["subtotal"]);
        $this->assertEquals($this->testProduct->name, $postedCart["cartItems"][0]["name"]);
    }

    /** @test */
    public function guest_can_add_and_get_image()
    {
        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];

        Storage::fake("s3");
        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];


        $this->post("/api/carts", $data);
        $diffProduct = factory(Product::class)->create([
            "price" => 700
        ]);
        $this->proImageRepo->saveProductImages($diffProduct->id, $images);
        $imageURL = $diffProduct->fresh()->productimages[0]["image"];
        $data2 = [
            "product_id" => $diffProduct->id,
            "quantity" => 2,
            "options" => [
                "image" => $imageURL
            ]
        ];

        $cartInfo = $this->post("/api/carts", $data2);
        $this->assertEquals(700, $cartInfo["cartItems"][1]["price"]);
        $this->assertEquals(2, $cartInfo["cartItems"][1]["quantity"]);
        $this->assertEquals("1,400", $cartInfo["cartItems"][1]["subtotal"]);
        $this->assertEquals($imageURL, $cartInfo["cartItems"][1]["imagePath"]);
    }
    /** @test */
    public function guest_can_get_cartitems()
    {
        $diffProduct = factory(Product::class)->create([
            "price" => 700
        ]);
        $data1 = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];
        $data2 = [
            "product_id" => $diffProduct->id,
            "quantity" => 1
        ];
        $datum = [
            $this->testProduct,
            $diffProduct
        ];

        $this->post("/api/carts", $data1);
        $this->post("/api/carts", $data2);

        $cartList = $this->get("/api/carts");
        $this->assertEquals("710", $cartList["cartSubTotal"]);
        $this->assertEquals(2, $cartList["cartCount"]);
        foreach (array_map(null, $cartList["cartItems"], $datum) as [$val1, $val2]) {
            $this->assertEquals($val1["price"], $val2->price);
        }
    }

    /** @test */
    public function guest_can_get_cartitems_with_image()
    {
        Storage::fake("s3");
        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];
        $this->proImageRepo->saveProductImages($this->testProduct->id, $images);
        $imageURL = $this->testProduct->fresh()->productimages[0]["image"];


        $data1 = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1,
            "options" => ["image" => $imageURL]
        ];


        $this->post("/api/carts", $data1);

        $imageFullPath =  Storage::disk('s3')->url('products/cover1.jpg');

        $cartList = json_decode($this->get("/api/carts")->content(), true);
        $this->assertEquals($imageFullPath, $cartList["cartItems"][0]["imagePath"]);
    }


    /** @test */
    public function guest_can_update_quantity_and_get_updated_info()
    {
        $diffProduct = factory(Product::class)->create([
            "price" => 700
        ]);
        $data1 = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];
        $data2 = [
            "product_id" => $diffProduct->id,
            "quantity" => 1
        ];

        $this->post("/api/carts", $data1);
        $postedCart = $this->post("/api/carts", $data2);

        $data = [
            "rowId" => $postedCart["cartItems"][1]["rowId"],
            "quantity" => 2
        ];
        //updateしたCartのrowIdとquantityが欲しい、あとフロントで計算したくないのでsubtotalも
        $updateData = $this->patch("/api/carts", $data);
        $this->assertEquals($postedCart["cartItems"][1]["rowId"], $updateData["cartItems"][1]["rowId"]);
        $this->assertEquals("1,400", $updateData["cartItems"][1]["subtotal"]);
        $this->assertEquals("1,410", $updateData["cartSubTotal"]);
    }

    /** @test */
    public function guest_can_delete_specificCartItem()
    {

        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];


        $postedCart = $this->post("/api/carts", $data);


        $data = [
            "rowId" => $postedCart["cartItems"][0]["rowId"]
        ];

        $deleteData = $this->post("/api/removecarts", $data);

        $this->assertCount(0, $deleteData["cartItems"]);
        $this->assertEquals("0", $deleteData["total"]);
    }

    /** @test */
    public function guest_can_not_restore_from_database()
    {

        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];

        $postedCart = $this->post("/api/carts", $data);
        session()->forget("cart.default");
        $cartlist = $this->get("/api/carts");
        $this->assertCount(0, $cartlist["cartItems"]);
    }

    /** @test */
    public function user_can_delete_and_restore_from_database()
    {
        $this->signIn();
        $diffProduct = factory(Product::class)->create();
        $data1 = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];
        $data2 = [
            "product_id" => $diffProduct->id,
            "quantity" => 1
        ];

        $postedCart = $this->post("/api/carts", $data1);
        $this->post("/api/carts", $data2);

        $data = [
            "rowId" => $postedCart["cartItems"][0]["rowId"]
        ];
        $this->post("/api/removecarts", $data);
        session()->forget("cart.default");
        $cartlist = $this->get("/api/carts");
        // dump($cartlist);
        $this->assertCount(1, $cartlist["cartItems"]);

        //sessionから値をdeleteしてgetItemできればok

    }

    /** @test */
    public function user_can_update_restore_from_database()
    {
        $this->signIn();

        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];


        $postedCart = $this->post("/api/carts", $data);


        $data = [
            "rowId" => $postedCart["cartItems"][0]["rowId"],
            "quantity" => 2
        ];
        $this->patch("/api/carts", $data);
        session()->forget("cart.default");
        $cartlist = $this->get("/api/carts");
        $this->assertEquals(2, $cartlist["cartItems"][0]["quantity"]);
    }

    /** @test */
    public function user_can_erase_database()
    {
        $this->signIn();
        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];

        $postedCart = $this->post("/api/carts", $data);
        $this->delete("/api/clearcart");
        session()->forget("cart.default");
        $cartlist = $this->get("/api/carts");
        $this->assertCount(0, $cartlist["cartItems"]);
    }

    /** @test */
    public function user_can_set_shipping_fee()
    {
        $this->signIn();
        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];

        $this->post("/api/carts", $data);
        $shipping = $this->shippingRepo->createShipping("dummy", 100);
        $data = [
            "shipping_id" => $shipping->id
        ];
        $this->post("/api/cartShippings", $data);
        $cartlist = json_decode($this->get("/api/carts")->content(), true);
        $this->assertEquals("111", $cartlist["total"]);
    }
    /** @test */
    public function user_can_set_discount()
    {
        $this->withoutExceptionHandling();
        $this->signIn();
        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];

        $this->post("/api/carts", $data);
        $discount = $this->discountRepo->createDiscount("dummy", 10);
        $data = [
            "discountCode" => $discount->discountCode
        ];
        $this->post("/api/cartDiscounts", $data);
        $cartlist = json_decode($this->get("/api/carts")->content(), true);

        $this->assertEquals("1", $cartlist["discount"]);
    }

    /** @test */
    public function user_can_restore_discount()
    {
        $this->withoutExceptionHandling();
        $this->signIn();
        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];

        $this->post("/api/carts", $data);
        $discount = $this->discountRepo->createDiscount("dummy", 10);
        $data = [
            "discountCode" => $discount->discountCode
        ];
        $this->post("/api/cartDiscounts", $data);
        session()->flush();
        $cartlist = json_decode($this->get("/api/carts")->content(), true);

        $this->assertEquals("1", $cartlist["discount"]);
    }

    /** @test */
    public function user_can_get_restore_shipping()
    {
        $this->signIn();
        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];

        $this->post("/api/carts", $data);
        $shipping = $this->shippingRepo->createShipping("dummy", 100);
        $data = [
            "shipping_id" => $shipping->id
        ];
        $this->post("/api/cartShippings", $data);


        session()->forget("shippingFee");
        $this->assertEquals(0, $this->cartRepo->getShippingFee());

        $cartlist = json_decode($this->get("/api/carts")->content(), true);
        $this->assertEquals("111", $cartlist["total"]);
        $this->assertEquals(100, $this->cartRepo->getShippingFee());
    }

    /** @test */
    public function database_clear_when_cart_count_is_0()
    {
        //loginしていればcartの状況はdetabあせと同期されるので、もし陽にclearCartでdatabaseからdeleteしなくてもcartItem自体0になればdatabaseも同期されて0になることを調べる
        $this->withoutExceptionHandling();
        $this->signIn();
        $data = [
            "product_id" => $this->testProduct->id,
            "quantity" => 1
        ];

        $postedCart = $this->post("/api/carts", $data);
        $data = [
            "rowId" => $postedCart["cartItems"][0]["rowId"]
        ];
        $this->post("/api/removecarts", $data);
        session()->forget("cart.default");
        $cartlist = $this->get("/api/carts");
        $this->assertCount(0, $cartlist["cartItems"]);

        //sessionから値をdeleteしてgetItemできればok

    }
}
