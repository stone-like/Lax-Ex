<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\DTO\Carts\CartDTO;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\ModelAndRepository\Products\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Gloudemans\Shoppingcart\Exceptions\InvalidRowIDException;



class CartTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_add_cart()
    {
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartList = $this->cartRepo->getCartItems();
        foreach ($cartList as $cart) {
            $this->assertEquals($this->testProduct->price, $cart->price);
            $this->assertEquals($this->testProduct->name, $cart->name);
            $this->assertEquals($quantity, $cart->qty);
        }
    }
    /** @test */
    public function it_can_add_cart_with_image()
    {

        Storage::fake("s3");
        $quantity = 1;
        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];
        $this->proImageRepo->saveProductImages($this->testProduct->id, $images);
        $imageURL = $this->testProduct->fresh()->productimages[0]["image"];
        $this->cartRepo->addCartToList($this->testProduct, $quantity, ["image" => $imageURL]);

        $imageFullPath =  Storage::disk('s3')->url('products/cover1.jpg');
        $cartList = $this->cartRepo->getCartItems();
        foreach ($cartList as $cart) {
            $this->assertEquals($imageFullPath, $cart->options["image"]);
        }
    }

    /** @test */
    public function it_can_update_cart()
    {
        $quantity = 1;
        $cart = $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $newQuantity = 2;
        $this->cartRepo->updateQuantity($cart->rowId, $newQuantity);
        $cartList = $this->cartRepo->getCartItems();
        foreach ($cartList as $cart) {
            $this->assertEquals($newQuantity, $cart->qty);
        }
    }

    /** @test */
    public function it_can_remove_cart()
    { {
            $quantity = 1;
            $cart = $this->cartRepo->addCartToList($this->testProduct, $quantity);
            $diffProduct = factory(Product::class)->create();
            $this->cartRepo->addCartToList($diffProduct, $quantity);

            $this->assertCount(2, $this->cartRepo->getCartItems());
            $this->cartRepo->clearCart();
            $this->assertCount(0, $this->cartRepo->getCartItems());
        }
    }

    /** @test */
    public function it_can_remove_specific_cart()
    {
        $quantity = 1;
        $cart = $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $diffProduct = factory(Product::class)->create();
        $this->cartRepo->addCartToList($diffProduct, $quantity);

        $this->assertCount(2, $this->cartRepo->getCartItems());
        $this->cartRepo->removeCart($cart->rowId);
        $this->assertCount(1, $this->cartRepo->getCartItems());
    }

    /** @test */
    public function it_errors_when_invalid_rowId_removed()
    {
        $this->expectException(InvalidRowIDException::class);
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);


        $this->cartRepo->removeCart("invalid");
    }


    /** @test */
    public function it_can_store_to_database()
    {
        $user = $this->signIn();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);

        $identifier = CartDTO::CreateIdentifier($user->name, $user->id);
        $this->cartRepo->storeToDatabase($identifier);
        //instanceはcartにある通りconst DEFAULT_INSTANCE = 'default';
        $this->assertDatabaseHas("shoppingcart", [
            "identifier" => $identifier,
            "instance" => "default",
            "content" => serialize($this->cartRepo->getCartItems())
        ]);
    }

    /** @test */
    public function it_can_restore_from_database()
    {
        $user = $this->signIn();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $identifier = CartDTO::CreateIdentifier($user->name, $user->id);
        $this->cartRepo->storeToDatabase($identifier);
        $this->cartRepo->clearCart();

        $this->assertCount(0, $this->cartRepo->getCartItems());
        $this->cartRepo->restoreFromDatabase($identifier);

        $this->assertCount(1, $this->cartRepo->getCartItems());
    }

    /** @test */
    public function it_can_erase_from_database()
    {
        $user = $this->signIn();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $identifier = CartDTO::CreateIdentifier($user->name, $user->id);
        $this->cartRepo->storeToDatabase($identifier);

        $this->cartRepo->eraseDatabase($identifier);

        $this->assertDatabaseMissing("shoppingcart", [
            "identifier" => $identifier,
            "instance" => "default",
            "content" => serialize($this->cartRepo->getCartItems())
        ]);
    }

    /** @test */
    public function it_can_get_db_content()
    {
        $user = $this->signIn();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $identifier = CartDTO::CreateIdentifier($user->name, $user->id);
        $this->cartRepo->storeToDatabase($identifier);

        $returned = $this->cartRepo->getDBContent($identifier);
        $this->assertNotNull($returned);
    }
    /** @test */
    public function it_can_null_when_try_to_get_non_exist_cart_from_db()
    {
        $user = $this->signIn();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $identifier = CartDTO::CreateIdentifier($user->name, $user->id);
        $this->cartRepo->storeToDatabase($identifier);
        $this->cartRepo->eraseDatabase($identifier);


        $returned = $this->cartRepo->getDBContent($identifier);
        $this->assertNull($returned);
    }

    /** @test */
    public function it_can_return_total()
    {
        $user = $this->signIn();
        $quantity = 1;
        $this->cartRepo->setShippingFee(500);
        //discountは～%offのことなので10を入れたら10%off
        $this->cartRepo->setGlobalDisCount(10);

        $this->cartRepo->addCartToList($this->testProduct, $quantity); //testProductのpriceは10
        $diffProduct = factory(Product::class)->create(["price" => 700]);
        $diffQuantity = 2;
        $this->cartRepo->addCartToList($diffProduct, $diffQuantity);

        $this->assertEquals("1,896", $this->cartRepo->getTotal());
    }
    /** @test */
    public function it_can_return_subtotal()
    {
        $user = $this->signIn();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $differentProduct = factory(Product::class)->create([
            "price" => 700
        ]);
        $diffQuantity = 2;
        $this->cartRepo->addCartToList($differentProduct, $diffQuantity);
        //subTotalはtaxなし
        $this->assertEquals("1,410", $this->cartRepo->getSubTotal());
    }
    //商品をすべて足した税の部分
    /** @test */
    public function it_can_return_tax()
    {
        $user = $this->signIn();
        $quantity = 1;
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $differentProduct = factory(Product::class)->create([
            "price" => 700
        ]);
        $diffQuantity = 2;
        $this->cartRepo->addCartToList($differentProduct, $diffQuantity);

        $this->assertEquals("141", $this->cartRepo->getTax());
    }
    /** @test */
    public function it_can_get_discount()
    {
        $user = $this->signIn();
        $quantity = 1;
        //discountは～%offのことなので５０を入れたら50%off
        $this->cartRepo->setGlobalDisCount(10); //この時点より後のitemも影響を受ける
        $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $differentProduct = factory(Product::class)->create([
            "price" => 700
        ]);
        $diffQuantity = 2;
        $this->cartRepo->addCartToList($differentProduct, $diffQuantity);
        //ただ、totalの計算の際は素のprice*taxに対してdiscountが計算されるので1410円でも税があるなら141とはならないので注意
        $this->assertEquals("141", $this->cartRepo->getDiscount());
    }

    /** @test */
    public function it_can_return_specific_cartitem()
    {
        $user = $this->signIn();
        $quantity = 1;
        $cart = $this->cartRepo->addCartToList($this->testProduct, $quantity);
        $cartitem = $this->cartRepo->getItem($cart->rowId);
        $this->assertEquals($this->testProduct->name, $cartitem->name);
    }

    /** @test */
    public function get_0_if_not_set_shipping_fee()
    {
        $user = $this->signIn();
        $quantity = 1;
        $shippingFee = $this->cartRepo->getShippingFee();
        $this->assertEquals(0, $shippingFee);

        // $this->cartRepo->setShippingFee(500);
        // //discountは～%offのことなので10を入れたら10%off
        // $this->cartRepo->setGlobalDisCount(10);

        // $this->cartRepo->addCartToList($this->testProduct, $quantity); //testProductのpriceは10
        // $shippingFee = $this->cartRepo->getShippingFee();
    }

    /** @test */
    public function can_get_shipping_fee()
    {
        $user = $this->signIn();
        $quantity = 1;

        $this->cartRepo->setShippingFee(500);
        //discountは～%offのことなので10を入れたら10%off
        $this->cartRepo->setGlobalDisCount(10);

        $this->cartRepo->addCartToList($this->testProduct, $quantity); //testProductのpriceは10
        $shippingFee = $this->cartRepo->getShippingFee();
        $this->assertEquals(500, $shippingFee);
    }
}
