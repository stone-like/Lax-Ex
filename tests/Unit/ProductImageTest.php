<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\ModelAndRepository\ProductImages\ProductImages;



class ProductImageTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function image_can_be_saved_to_s3()
    {
        $this->withoutExceptionHandling();
        Storage::fake("s3");

        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];

        $this->proImageRepo->saveProductImages($this->testProduct->id, $images);
        Storage::disk('s3')->assertExists('products/cover1.jpg');
        Storage::disk('s3')->assertExists('products/cover2.jpg');
        Storage::disk('s3')->assertExists('products/cover3.jpg');

        $fullpath1 =  Storage::disk('s3')->url('products/cover1.jpg');
        $fullpath2 =  Storage::disk('s3')->url('products/cover2.jpg');
        $fullpath3 =  Storage::disk('s3')->url('products/cover3.jpg');

        $this->assertDatabaseHas("product_images", ["image" => $fullpath1]);
        $this->assertDatabaseHas("product_images", ["image" => $fullpath2]);
        $this->assertDatabaseHas("product_images", ["image" => $fullpath3]);
    }

    /** @test */
    public function image_can_be_saved_with_autox420()
    {
        $this->withExceptionHandling();
        Storage::fake("s3");

        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];

        $this->proImageRepo->saveProductImages($this->testProduct->id, $images);


        $image1 =  Storage::disk('s3')->get('products/cover1.jpg');
        $image = Image::make($image1);
        $this->assertEquals(420, $image->height());
    }

    /** @test */
    public function image_can_be_updated_with_autox420()
    {
        $this->withoutExceptionHandling();
        Storage::fake("s3");

        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];

        $this->proImageRepo->saveProductImages($this->testProduct->id, $images);

        $imageList = ProductImages::all()->toArray();
        $firstImageId = $imageList[0]["id"];
        $secondImageId = $imageList[1]["id"];
        $thirdImageId = $imageList[2]["id"];

        $updateImages = [
            $file4 = UploadedFile::fake()->image("cover4.jpg", 600, 600),
            $file5 = UploadedFile::fake()->image("cover5.jpg", 600, 600),
            $file6 = UploadedFile::fake()->image("cover6.jpg", 600, 600)
        ];
        $params = [
            "imageObjList" => [
                [
                    "id" => $firstImageId,
                    "image" => $file4
                ],
                [
                    "id" => $secondImageId,
                    "image" => $file5
                ],
                [
                    "id" => $thirdImageId,
                    "image" => $file6
                ]
            ]
        ];

        $this->proImageRepo->updateProductImages($params);

        $image4 =  Storage::disk('s3')->get('products/cover4.jpg');
        $image5 =  Storage::disk('s3')->get('products/cover5.jpg');
        $image6 =  Storage::disk('s3')->get('products/cover6.jpg');

        $resize4 = Image::make($image4);
        $resize5 = Image::make($image5);
        $resize6 = Image::make($image6);

        $this->assertEquals(420, $resize4->height());

        $this->assertEquals(420, $resize5->height());

        $this->assertEquals(420, $resize6->height());
    }

    /** @test */
    public function image_can_be_updated_to_s3()
    {

        Storage::fake("s3");

        $images = [
            $file1 = UploadedFile::fake()->image("cover1.jpg", 600, 600),
            $file2 = UploadedFile::fake()->image("cover2.jpg", 600, 600),
            $file3 = UploadedFile::fake()->image("cover3.jpg", 600, 600)
        ];

        $this->proImageRepo->saveProductImages($this->testProduct->id, $images);
        $imageList = ProductImages::all()->toArray();
        $firstImageId = $imageList[0]["id"];
        $secondImageId = $imageList[1]["id"];
        $thirdImageId = $imageList[2]["id"];


        $updateImages = [
            $file4 = UploadedFile::fake()->image("cover4.jpg", 600, 600),
            $file5 = UploadedFile::fake()->image("cover5.jpg", 600, 600),
            $file6 = UploadedFile::fake()->image("cover6.jpg", 600, 600)
        ];
        $params = [
            "imageObjList" => [
                [
                    "id" => $firstImageId,
                    "image" => $file4
                ],
                [
                    "id" => $secondImageId,
                    "image" => $file5
                ],
                [
                    "id" => $thirdImageId,
                    "image" => $file6
                ]
            ]
        ];
        $this->proImageRepo->updateProductImages($params);
        Storage::disk('s3')->assertMissing('products/cover1.jpg');
        Storage::disk('s3')->assertMissing('products/cover2.jpg');
        Storage::disk('s3')->assertMissing('products/cover3.jpg');
        $fullpath1 =  Storage::disk('s3')->url('products/cover1.jpg');
        $fullpath2 =  Storage::disk('s3')->url('products/cover2.jpg');
        $fullpath3 =  Storage::disk('s3')->url('products/cover3.jpg');
        $this->assertDatabaseMissing("product_images", ["image" => $fullpath1]);
        $this->assertDatabaseMissing("product_images", ["image" => $fullpath2]);
        $this->assertDatabaseMissing("product_images", ["image" => $fullpath3]);

        Storage::disk('s3')->assertExists('products/cover4.jpg');
        Storage::disk('s3')->assertExists('products/cover5.jpg');
        Storage::disk('s3')->assertExists('products/cover6.jpg');
        $fullpath4 =  Storage::disk('s3')->url('products/cover4.jpg');
        $fullpath5 =  Storage::disk('s3')->url('products/cover5.jpg');
        $fullpath6 =  Storage::disk('s3')->url('products/cover6.jpg');
        $this->assertDatabaseHas("product_images", ["image" => $fullpath4]);
        $this->assertDatabaseHas("product_images", ["image" => $fullpath5]);
        $this->assertDatabaseHas("product_images", ["image" => $fullpath6]);
    }
}
