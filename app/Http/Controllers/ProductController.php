<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DTO\Products\ProductDTO;
use Illuminate\Support\Collection;
use App\Http\Resources\ProductResource;

use App\DTO\ProductImages\ProductImageDTO;

use App\ModelAndRepository\Products\Requests\GetProductRequest;
use App\ModelAndRepository\Products\Requests\CreateProductRequest;
use App\ModelAndRepository\Products\Requests\DeleteProductRequest;
use App\ModelAndRepository\Products\Requests\UpdateProductRequest;
use App\ModelAndRepository\Products\Requests\SearchByCategoryRequest;
use App\ModelAndRepository\Products\Requests\SearchByMultipleRequest;
use App\ModelAndRepository\Products\Requests\GetRelatedProductRequest;
use App\ModelAndRepository\Products\Requests\CreateProductImageRequest;
use App\ModelAndRepository\Products\Requests\DeleteProductImageRequest;
use App\ModelAndRepository\Products\Requests\UpdateProductImageRequest;
use App\ModelAndRepository\Products\Repository\ProductRepositoryInterface;
use App\ModelAndRepository\Categories\Repository\CategoryRepositoryInterface;
use App\ModelAndRepository\ProductImages\Repository\ProductImageRepositoryInterface;

class ProductController extends Controller
{
    private $proRepo;
    private $proImageRepo;
    private $cateRepo;

    public function __construct(ProductRepositoryInterface $proRepo, ProductImageRepositoryInterface $proImageRepo, CategoryRepositoryInterface $cateRepo)
    {
        $this->proRepo = $proRepo;
        $this->proImageRepo = $proImageRepo;
        $this->cateRepo = $cateRepo;
    }

    //attributeが多い場合request->all()で済ませるのがいいのか、それとも一つ一つ引数でやるのがいいのか、それともクラスを作ってしまうのがいいか悩む
    public function createProduct(CreateProductRequest $request)
    {
        //productを作るときにはimageがある場合とない場合を想定しているので、imageがある場合一旦imageを別に分けてあげる
        $params = ProductDTO::transformRequest($request);
        $product = $this->proRepo->createProduct($params);
        //categoryListとproductを二つとも返すのは明らかにおかしい、なのでcategoryはフロントできちんと変えることにする
        return $product;
    }
    //updateの時だけはimageとその他を分ける(createの時は一緒)
    //S3からupdateの際,元の画像を削除する(同一imageだったら削除しないはできたら実装する)
    public function updateProduct(string $id, UpdateProductRequest $request)
    {
        $params = ProductDTO::transformRequest($request);
        $product = $this->proRepo->updateProduct($id, $params);
    }
    public function deleteProduct(string $id, DeleteProductRequest $request)
    {
        //s3imageを削除


        $productImageIds = ProductImageDTO::modelsToIds(
            $this->proImageRepo->findProductImageByProductId($id)
        );

        $this->proImageRepo->deleteProductImages($productImageIds);
        $product = $this->proRepo->deleteProduct($id);
    }

    //toDo:image関連はimageControllerに移動する
    public function saveProductImage(CreateProductImageRequest $request)
    {
        $params = ProductImageDTO::transformCreateRequest($request);
        $this->proImageRepo->saveProductImages($params["product_id"], $params["imageContentArray"]);
    }
    public function deleteProductImage(DeleteProductImageRequest $request)
    {
        $this->proImageRepo->deleteProductImages($request->deleteIds);
    }


    public function updateProductImage(UpdateProductImageRequest $request)
    {
        // dump($request->all());
        $params = ProductImageDTO::transformUpdateRequest($request);
        //ここでimgObjlistの形に戻すかrepositoryのコードを変更するかだけど・・・objに戻した方がコード見やすそうなのでrepositoryは変えずに、ここでDTOを使う
        $this->proImageRepo->updateProductImages($params);
    }

    public function getProduct(GetProductRequest $request)
    {

        $product = $this->proRepo->findProductById($request->product_id);
        return new ProductResource($product);
    }

    public function getRelatedProduct(GetRelatedProductRequest $request)
    {
        $productList = $this->proRepo->getRelatedProduct($request->category_id, $request->product_id);
        return ProductResource::collection($productList);
    }
    public function getRecommendedProduct()
    {

        $productList = $this->proRepo->getRecommendedProduct();
        return ProductResource::collection($productList);
    }



    //DTOを使ってproduct→productimageとnestしているのをflattenする
    //フロントで成形することもできるのであまりよろしくないみたい
    //controllerではlaravelの機能使うことにしているので今回はResourceを使うことにする
    public function searchBySlug(Request $request)
    {
        $productList = $this->proRepo->searchByslug($request->slug);
        return ProductResource::collection($productList);
    }
    public function searchByCategory(SearchByCategoryRequest $request)
    {

        $productList = $this->proRepo->searchByCategory($request->category_id);
        return ProductResource::collection($productList);
    }

    //中途半端なアーキテクチャにしているせいで、もしMultipleの項目を変更した場合controllerとrepository二ついじらなければいけないのはこの構成のデメリット
    public function searchByMultiple(SearchByMultipleRequest $request)
    {

        $productList = $this->proRepo->searchByMultiple(ProductDTO::excludePage($request));
        return ProductResource::collection($productList);
    }
}
