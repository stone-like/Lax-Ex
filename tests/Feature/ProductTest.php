<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\ModelAndRepository\Admins\Admin;
use App\ModelAndRepository\ProductImages\ProductImages;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permissioned_admin_can_create_product()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";

        $product = [
            "name" => $name,
            "category_id" => $this->testCategory->id,
            "quantity" => 3,
            "price" => 600,
            "weight" => 500
        ];

        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //staffでログイン

        $postedProduct = $this->post("/api/admin/products", $product);
        $this->assertEquals($product["name"], $postedProduct["name"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_create_product()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";

        $product = [
            "name" => $name,
            "category_id" => $this->testCategory->id,
            "quantity" => 3,
            "price" => 600,
            "weight" => 500
        ];

        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //staffでログイン

        $this->post("/api/admin/products", $product)->assertStatus(403);
    }

    /** @test */
    public function status_is_correctly_created()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";

        $product = [
            "name" => $name,
            "category_id" => $this->testCategory->id,
            "quantity" => 3,
            "price" => 600,
            "weight" => 500
        ];

        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //staffでログイン

        $postedProduct = $this->post("/api/admin/products", $product);
        $this->assertEquals("3 items left", $postedProduct["status"]);
    }

    /** @test */
    public function invalid_when_non_existing_category()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";

        $product = [
            "name" => $name,
            "category_id" => 300000000,
            "quantity" => 3,
            "price" => 600,
            "weight" => 500
        ];

        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //staffでログイン

        $this->post("/api/admin/products", $product)->assertSessionHasErrors("category_id");
    }
    /** @test */
    public function invalid_when_duplicated_product_name()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";

        $product = [
            "name" => $name,
            "category_id" => $this->testCategory->id,
            "quantity" => 3,
            "price" => 600,
            "weight" => 500
        ];

        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //staffでログイン

        $this->post("/api/admin/products", $product);
        $this->post("/api/admin/products", $product)->assertSessionHasErrors("name");
    }



    /** @test */
    public function unauthorized_admin_can_not_create_product()
    {
        $admin = factory(Admin::class)->create();
        $name = "dummy";

        $product = [
            "name" => $name,
            "category_id" => $this->testCategory->id,
            "quantity" => 3,
            "price" => 600,
            "weight" => 500,
        ];

        $this->adminSignIn($admin);

        $this->post("/api/admin/products", $product)->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_update_product()
    {
        $admin = factory(Admin::class)->create();

        $product = [
            "name" => "dummy",

            "category_id" => $this->testCategory->id,
            "quantity" => 3,
            "price" => 600,
            "weight" => 500
        ];

        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //staffでログイン

        $postedProduct = $this->post("/api/admin/products", $product);


        $product = [
            "name" => "dummy2",

            "category_id" => $this->testCategory->id,
            "quantity" => 0,
            "price" => 600,
            "weight" => 500
        ];

        $this->patch("/api/admin/products/" . $postedProduct["id"], $product);

        $targetProduct = $this->proRepo->findProductById($postedProduct["id"]);

        $this->assertEquals($targetProduct->name, $product["name"]);
        $this->assertEquals($targetProduct->status, "sold out");
    }

    /** @test */
    public function non_permissioned_admin_can_not_update_product()
    {
        $admin = factory(Admin::class)->create();

        $product = [
            "name" => "dummy",

            "category_id" => $this->testCategory->id,
            "quantity" => 3,
            "price" => 600,
            "weight" => 500
        ];

        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $postedProduct = $this->post("/api/admin/products", $product);

        $dummyAdmin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"], "dummyRole");
        $dummyAdmin->assignRole($role->name);
        $this->adminSignIn($dummyAdmin);
        $product = [
            "name" => "dummy2",

            "category_id" => $this->testCategory->id,
            "quantity" => 0,
            "price" => 600,
            "weight" => 500
        ];

        $this->patch("/api/admin/products/" . $postedProduct["id"], $product)->assertStatus(403);
    }


    /** @test */
    public function s3_image_also_deleted_when_delete_product()
    {


        Storage::fake("s3");

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $product = [
            "name" => "dummy",
            "category_id" => $this->testCategory->id,
            "quantity" => 3,
            "price" => 600,
            "weight" => 500,
        ];
        $postedProduct = $this->post("/api/admin/products", $product);

        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];
        $this->proImageRepo->saveProductImages($postedProduct["id"], $images);

        $this->delete("/api/admin/products/" . $postedProduct["id"]);
        Storage::disk('s3')->assertMissing('products/cover1.jpg');
        Storage::disk('s3')->assertMissing('products/cover2.jpg');
        Storage::disk('s3')->assertMissing('products/cover3.jpg');
        $fullpath1 =  Storage::disk('s3')->url('products/cover1.jpg');
        $fullpath2 =  Storage::disk('s3')->url('products/cover2.jpg');
        $fullpath3 =  Storage::disk('s3')->url('products/cover3.jpg');
        $this->assertDatabaseMissing("product_images", ["image" => $fullpath1]);
        $this->assertDatabaseMissing("product_images", ["image" => $fullpath2]);
        $this->assertDatabaseMissing("product_images", ["image" => $fullpath3]);
    }

    /** @test */
    public function guest_can_get_product()
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
        $returnProduct = $this->proRepo->createProduct($product);

        $data = [
            "product_id" => $returnProduct->id
        ];

        $product = json_decode($this->post("/api/products", $data)->content(), true);



        $this->assertEquals("dummy", $product["data"]["name"]);
    }

    /** @test */
    public function guest_can_get_related_product()
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
        $returnedProduct = $this->proRepo->createProduct($product);

        $data = [
            "category_id" => $this->testCategory->id,
            "product_id" => $returnedProduct->id
        ];
        $productList = json_decode($this->post("/api/relatedproducts", $data)->content(), true);


        $this->assertCount(3, $productList["data"]);
    }


    /** @test */
    public function guest_can_search_by_category()
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

        $data = [
            "category_id" => $this->testCategory->id
        ];

        $productList = json_decode($this->post("/api/products/searchByCategory", $data)->content(), true);


        $this->assertCount(2, $productList["data"]);
    }

    /** @test */
    public function invalid_when_non_existing_category_id()
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

        $data = [
            "category_id" => 60000000000
        ];

        $this->post("/api/products/searchByCategory", $data)->assertStatus(302);
    }

    /** @test */
    public function successfully_flatten_product_with_images()
    {
        $this->withoutExceptionHandling();
        Storage::fake("s3");
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
        $product = $this->proRepo->createProduct($product);
        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];

        $this->proImageRepo->saveProductImages($product->id, $images);

        $data = [
            "category" => $this->testCategory->id,
            "name" => "dummy"
        ];

        $productList = json_decode($this->post("/api/products/searchByMultiple", $data)->content(), true);
        $fullpathList = [
            Storage::disk("s3")->url("products/cover1.jpg"),
            Storage::disk("s3")->url("products/cover2.jpg"),
            Storage::disk("s3")->url("products/cover3.jpg"),
        ];
        $images = $productList["data"][0]["images"];
        foreach ($fullpathList as $index => $fullpath) {
            $this->assertEquals($fullpath, $images[$index]["image"]);
        }
    }

    //相当複雑なことをやっているのでバグが生まれやすい
    /** @test */
    public function selected_product_images_successfully_updated()
    {
        $this->withoutExceptionHandling();
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        Storage::fake("s3");
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
        $product = $this->proRepo->createProduct($product);
        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];

        $this->proImageRepo->saveProductImages($product->id, $images);

        $file4 = UploadedFile::fake()->image("cover4.jpg", 600, 600);
        $file5 = UploadedFile::fake()->image("cover5.jpg", 600, 600);


        $imageList = ProductImages::all()->toArray();

        $firstImageId = $imageList[0]["id"];
        $secondImageId = $imageList[1]["id"];
        $data = [
            "image_contents" => [$file4, $file5],
            "image_ids" => [$firstImageId, $secondImageId]
        ];
        $this->post("/api/admin/updateproductimages", $data);

        Storage::disk('s3')->assertMissing('products/cover1.jpg');
        Storage::disk('s3')->assertMissing('products/cover2.jpg');
        $fullpath1 =  Storage::disk('s3')->url('products/cover1.jpg');
        $fullpath2 =  Storage::disk('s3')->url('products/cover2.jpg');
        $this->assertDatabaseMissing("product_images", ["image" => $fullpath1]);
        $this->assertDatabaseMissing("product_images", ["image" => $fullpath2]);

        Storage::disk('s3')->assertExists('products/cover4.jpg');
        Storage::disk('s3')->assertExists('products/cover5.jpg');
        $fullpath4 =  Storage::disk('s3')->url('products/cover4.jpg');
        $fullpath5 =  Storage::disk('s3')->url('products/cover5.jpg');
        $this->assertDatabaseHas("product_images", ["image" => $fullpath4]);
        $this->assertDatabaseHas("product_images", ["image" => $fullpath5]);

        Storage::disk('s3')->assertExists('products/cover3.jpg');
        $fullpath3 =  Storage::disk('s3')->url('products/cover3.jpg');
        $this->assertDatabaseHas("product_images", ["image" => $fullpath3]);
    }

    /** @test */
    public function error_when_at_least_one_input_non_image_()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        Storage::fake("s3");
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
        $product = $this->proRepo->createProduct($product);
        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];

        $this->proImageRepo->saveProductImages($product->id, $images);

        $file4 = UploadedFile::fake()->image("cover4.jpg", 600, 600);
        $file5 = UploadedFile::fake()->image("cover5.jpg", 600, 600);
        $data = [
            "image_contents" => ["afdaffa", "sbdhsdh"],
            "image_ids" => [1, 2]
        ];
        $this->post("/api/admin/updateproductimages",  $data)->assertStatus(422)->assertJson([
            "errors" => [
                "imageContent" => "must input valid image Data"
            ]
        ]);
    }

    /** @test */
    public function error_when_non_existing_productimage_id_inputed()
    {
        $this->withoutExceptionHandling();
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createProduct"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        Storage::fake("s3");
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
        $product = $this->proRepo->createProduct($product);
        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];

        $this->proImageRepo->saveProductImages($product->id, $images);

        $file4 = UploadedFile::fake()->image("cover4.jpg", 600, 600);
        $file5 = UploadedFile::fake()->image("cover5.jpg", 600, 600);
        $data = [
            "image_contents" => [$file4, $file5],
            "image_ids" => [500000000, 60000000000]
        ];
        $this->post("/api/admin/updateproductimages", $data)->assertStatus(422)->assertJson([
            "errors" => [
                "image_id" => "invalid image id inputed..."
            ]
        ]);
    }



    /** @test */
    public function error_when_admin_with_non_role()
    {
        $admin = factory(Admin::class)->create();
        $this->adminSignIn($admin);


        Storage::fake("s3");
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
        $product = $this->proRepo->createProduct($product);
        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];

        $this->proImageRepo->saveProductImages($product->id, $images);

        $file4 = UploadedFile::fake()->image("cover4.jpg", 600, 600);
        $file5 = UploadedFile::fake()->image("cover5.jpg", 600, 600);
        $data = [

            "image_contents" => [$file4, $file5],
            "image_ids" => [1, 2]

        ];
        $this->post("/api/admin/updateproductimages", $data)->assertStatus(403);
    }
}
