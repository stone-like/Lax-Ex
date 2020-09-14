<?php

use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use App\ModelAndRepository\Products\Product;
use App\ModelAndRepository\Categories\Category;
use App\ModelAndRepository\ProductImages\Repository\ProductImageRepository;

class CategoryProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        factory(Category::class, 2)->create()->each(function (Category $category, $key1) {
            factory(Product::class, 10)->create(["category_id" => $category->id])->each(function (Product $product, $key2) use ($key1) {


                $keyNum = $key1 === 0 ? $key2 + 1 : $key2 + 11;

                $img = UploadedFile::fake()->image("cover" . $keyNum . ".jpg", 600, 600);
                $proImageRepo = new ProductImageRepository();
                $proImageRepo->saveProductImages($product->id, [$img]);
            });
        });
    }
}
