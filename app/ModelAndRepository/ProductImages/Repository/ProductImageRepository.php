<?php

namespace App\ModelAndRepository\ProductImages\Repository;

use Carbon\Carbon;
use Intervention\Image\Facades\Image;

use Illuminate\Support\Facades\Storage;
use App\Exceptions\ProductImageNotFoundException;
use App\ModelAndRepository\ProductImages\ProductImages;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\ModelAndRepository\ProductImages\Repository\ProductImageRepositoryInterface;
use Illuminate\Http\File;

class ProductImageRepository implements ProductImageRepositoryInterface
{

    public function createResizedImg($img)
    {
        $resizedImg = Image::make($img);
        $height = 420;
        $resizedImg->resize(null, $height, function ($constraint) {
            $constraint->aspectRatio();
        });
        return $resizedImg;
    }
    public function createTmpDirectiory()
    {
        if (!file_exists($tmp_file_dir = storage_path('tmp'))) {
            mkdir($tmp_file_dir, 0777, true);
        }
    }
    public function createTmpPathAndTmpFileName(string $name): array
    {
        $this->createTmpDirectiory();

        $now = date_format(Carbon::now(), 'YmdHis');
        $tmpFileName = $now . '_' . $name;
        $tmpPath = storage_path("tmp/") . $now . '_' . $name;
        return ["tmpPath" => $tmpPath, "tmpFileName" => $tmpFileName];
    }
    public function createTmpFile($resizedImg, string $tmpPath)
    {
        $resizedImg->save($tmpPath);
    }
    public function deleteTmpFile($tmpFileName)
    {
        Storage::disk("local")->delete("tmp/" . $tmpFileName);
    }
    //実際の画像はamazonS3に、urlはDBに
    public function saveProductImages(int $productId, array $images)
    {

        foreach ($images as $img) {

            // //$imgはFileクラスなので、attributeにnameがある

            // Storage::disk("s3")->putFileAs("products", $img, $img->getClientOriginalName(), "public");

            // //フルパスを取得
            // $fullPath = Storage::disk("s3")->url("products/" . $img->getClientOriginalName());
            // $productImage = ["product_id" => $productId, "image" => $fullPath];
            // ProductImages::create($productImage);


            $imgName = $img->getClientOriginalName();
            $resizedImg = $this->createResizedImg($img);

            $tmpArray = $this->createTmpPathAndTmpFileName($imgName);
            $tmpFileName = $tmpArray["tmpFileName"];
            $tmpPath = $tmpArray["tmpPath"];

            $this->createTmpFile($resizedImg, $tmpPath);
            //注意として、getClientOriginalNameはImage::makeを通すと使えないのであらかじめ取得しておく
            //一旦ローカルに保存しないとファイル名を指定できないみたい
            //ローカルの画像をアップロードすることでファイル名が指定可能に
            Storage::disk("s3")->putFileAs("products", new File($tmpPath), $imgName, "public");

            // //フルパスを取得
            $fullPath = Storage::disk("s3")->url("products/" . $imgName);
            $productImage = ["product_id" => $productId, "image" => $fullPath];
            ProductImages::create($productImage);

            $this->deleteTmpFile($tmpFileName);
        }
    }
    public function deleteProductImages(array $imageIds)
    {

        foreach ($imageIds as $imgId) {

            $productImage = $this->findProductImageById($imgId);
            $relativeProductPath = "products/" . basename($productImage->image);
            Storage::disk("s3")->delete($relativeProductPath);
            $productImage->delete();
        }
    }



    public function updateProductImages(array $params)
    {
        // $productImages = $this->findProductImageByProductId($request["product_id"]);
        //ここでやりたいことは選択されたproductImageのみをupdate

        //選択されたproductimageのS3imageをdelete,ただproductImage自体(DB)は消さずにupdateするだけで、新しくS3にも保存
        //注意恬としてimg->nameではなく、originalNameでなくてはダメ見たい
        foreach ($params["imageObjList"] as $imageObj) {

            $productImageId = $imageObj["id"];
            $updateImageContent = $imageObj["image"];

            $productImage = $this->findProductImageById($productImageId);
            $relativeProductPath = "products/" . basename($productImage->image);
            Storage::disk("s3")->delete($relativeProductPath);


            $imgName = $updateImageContent->getClientOriginalName();

            $resizedImg = $this->createResizedImg($updateImageContent);

            $tmpArray = $this->createTmpPathAndTmpFileName($imgName);
            $tmpFileName = $tmpArray["tmpFileName"];
            $tmpPath = $tmpArray["tmpPath"];

            $this->createTmpFile($resizedImg, $tmpPath);

            //DBUpdate+S3に保存
            Storage::disk("s3")->putFileAs("products", new File($tmpPath), $imgName, "public");
            $fullPath = Storage::disk("s3")->url("products/" . $imgName);

            //別に消すわけではないのでproductIdはいらない
            $productImage->update([
                "image" => $fullPath
            ]);

            $this->deleteTmpFile($tmpFileName);
        }
    }

    public function findProductImageById(int $imageId)
    {
        return ProductImages::where('id', $imageId)->first();
    }

    public function findProductImageByProductId(int $productId)
    {

        return ProductImages::where("product_id", $productId)->get();
    }
}
