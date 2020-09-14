<?php

namespace Tests\Unit;

use Tests\TestCase;

use Illuminate\Support\Str;
use App\ModelAndRepository\Products\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductTest extends TestCase
{
  use RefreshDatabase;

  //unitTestなのでroleによる権限はtestしない

  /** @test */
  public function product_can_be_created()
  {
    $name = "dummy";

    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);

    $this->assertDatabaseHas("products", ["name" => $name]);
  }

  /** @test */
  public function product_can_be_deleted()
  {
    $name = "dummy";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $postedProduct = $this->proRepo->createProduct($product);
    $this->proRepo->deleteProduct($postedProduct->id);
    $this->assertDatabaseMissing("products", ["name" => $name]);
  }

  /** @test */
  public function product_can_find_by_slug()
  {
    $name = "dummy1";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);

    $name = "dummy2";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);
    $products = $this->proRepo->searchBySlug("dummy");
    $this->assertEquals(2, count($products));
  }

  /** @test */
  public function product_can_find_by_category()
  {
    $name = "dummy1";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);

    $name = "dummy2";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);

    //このtest単発ならCategory_idの1をそのまま入れていいんだけど、testが連続する場合、testcaseで作られるtestCategoryは一つのtestごとに作られる
    //個数自体はtableの内容が消されるだけであってtable自体がすべてresetされるわけではない、なのでidは8とかになる


    $products = $this->proRepo->searchByCategory($this->testCategory->id);
    $this->assertEquals(3, count($products)); //testCaseで作った分も合わせて３つ
  }

  /** @test */
  public function it_can_get_all_product_when_recommended_producte_result_is_under_10_element()
  {
    $name = "dummy1";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);

    $name = "dummy2";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);
    $name = "dummy3";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);
    $name = "dummy4";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $product = $this->proRepo->createProduct($product);

    $productList = $this->proRepo->getRecommendedProduct();
    $this->assertEquals(5, count($productList));
  }

  /** @test */
  public function random_product_can_get()
  {
    $name = "dummy1";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);

    $name = "dummy2";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);
    $name = "dummy3";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);
    $name = "dummy4";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $product = $this->proRepo->createProduct($product);

    //合計5つtestCategoryに作って、そこから3つ取ってこれたらOK...なんだけど自分自身をのぞくのも良くて、randomと自分自身をのぞく操作は同時に操作できないと思う,しかも操作順がrandom→自分自身をのぞくなので関数分離も面倒、どうする？
    $products = $this->proRepo->getRelatedProduct($this->testCategory->id, $product->id);
    $this->assertEquals(3, count($products));
  }
  /** @test */
  public function can_get_except_selected_product()
  {
    $name = "dummy1";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);

    $name = "dummy2";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);
    $name = "dummy3";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);
    $name = "dummy4";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $product = $this->proRepo->createProduct($product);

    $query = Product::where("category_id", $this->testCategory->id);

    $queryBuilder = $this->proRepo->exceptSelectedProduct($product->id, $query); //dummy4が除けているか？

    $productList = $queryBuilder->get();

    $this->assertNotContains("dummy4", array_column($productList->toArray(), "name"));
  }

  //別にcollectionからページネーションに変えても構造自体は崩れない
  /** @test */
  public function all_product_can_be_searched()
  {

    $pagenationCount = 5;
    $count = min(count(Product::all()), $pagenationCount);
    $productList = $this->proRepo->searchByMultiple([]);
    $this->assertCount($count, $productList);
  }

  /** @test */
  public function product_can_find_by_multiple()
  {
    $name = "dummy1";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);

    $name = "dummy2";
    $product = [
      "name" => $name,
      "slug" => Str::slug($name),
      "category_id" => $this->testCategory->id,
      "quantity" => 3,
      "price" => 600,
      "weight" => 500,

      "status" => "3 items left"
    ];
    $this->proRepo->createProduct($product);

    $products = $this->proRepo->searchByMultiple(["category" => $this->testCategory->id, "name" => "dummy2"]);
    $this->assertEquals(1, count($products));
  }
}
