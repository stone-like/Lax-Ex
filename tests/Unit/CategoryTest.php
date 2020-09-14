<?php

namespace Tests\Unit;


use Tests\TestCase;
use Illuminate\Support\Str;
use App\Exceptions\CategoryNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_be_created()
    {

        $this->cateRepo->createCategory("test");
        $this->assertDatabaseHas("categories", ["name" => "test"]);
    }

    /** @test */
    public function it_can_be_updated()
    {

        $category = $this->cateRepo->createCategory("test");
        $this->cateRepo->updateCategory($category->id, "updated");
        $this->assertDatabaseHas("categories", ["name" => "updated"]);
    }

    /** @test */
    public function update_return_with_products_count()
    {

        $category = $this->cateRepo->createCategory("test");
        $category = $this->cateRepo->updateCategory($category->id, "updated");
        $this->assertNotNull($category->products_count);
    }

    /** @test */
    public function it_can_be_deleted()
    {

        $category = $this->cateRepo->createCategory("test");
        $this->cateRepo->deleteCategory($category->id);
        $this->assertDatabaseMissing("categories", ["name" => "test"]);
    }

    /** @test */
    public function all_category_can_be_extracted()
    {
        //親のtestCaseであらかじめ一つ作ってある分も合わせて
        $this->cateRepo->createCategory("test1");

        $categories = $this->cateRepo->getAllCategory();
        $this->assertEquals(2, count($categories));
    }

    /** @test */
    public function all_category_can_be_extracted_with_each_product_count()
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


        $categories = $this->cateRepo->getAllCategory();
        $this->assertEquals(2, $categories[0]["products_count"]);
    }

    /** @test */
    public function can_not_delete_non_exists_category()
    {
        $this->expectException(CategoryNotFoundException::class);

        $id = 4000000000;
        $this->cateRepo->deleteCategory($id);
    }

    /** @test */
    public function can_not_update_when_non_exists_categoryId()
    {
        $this->expectException(CategoryNotFoundException::class);

        $id = 200000000000;

        $this->cateRepo->createCategory("test");
        $this->cateRepo->updateCategory($id, "updated");
    }
}
