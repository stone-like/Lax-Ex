<?php

namespace App\ModelAndRepository\Products\Repository;

use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;
use App\Exceptions\ProductNotFoundException;
use App\ModelAndRepository\Products\Product;
use Illuminate\Database\Eloquent\Collection;
use App\ModelAndRepository\Categories\Category;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Exceptions\SearchQueryNotFoundException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\ModelAndRepository\Products\Repository\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    public function deleteProduct(int $id): bool
    {
        $product = $this->findProductById($id);
        //この時DBからはimagePathは消えるけど、S3は消えないので注意
        return $product->delete();
    }
    public function updateProduct(int $id, array $params): Product
    {
        $product = $this->findProductById($id);
        $product->update($params);
        return $product;
    }
    public function createProduct(array $params): Product
    {
        return Product::create($params);
    }
    public function findProductById(int $id): Product
    {
        try {
            return Product::where("id", $id)->firstOrfail();
        } catch (ModelNotFoundException $e) {
            throw new ProductNotFoundException($e->getMessage());
        }
    }
    public function findProductBySlug(string $slug): Product
    {
        try {
            return Product::where("slug", $slug)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new ProductNotFoundException($e->getMessage());
        }
    }
    public function exceptSelectedProduct(int $product_id, Builder $query): Builder
    {
        return $query->whereNotIn("id", [$product_id]);
    }
    public function getRelatedProduct(int $category_id, int $product_id): Collection
    {
        $query = $this->exceptSelectedProduct($product_id, Product::where("category_id", $category_id));
        return $query->get()->random(3);
    }

    public function getRecommendedProduct(): Collection
    {

        $productList = Product::all();
        if (count($productList) < 10) {
            return $productList;
        }

        return $productList->random(10);
    }

    public function searchBySlug(string $slug): LengthAwarePaginator
    {
        return Product::where("name", "LIKE", "%{$slug}%")->paginate(5);
    }
    public function searchByCategory(int $category_id): LengthAwarePaginator
    {
        return Product::where("category_id", $category_id)->paginate(5);
    }

    public function searchByMultiple(array $filters): LengthAwarePaginator
    {

        if (empty($filters)) {
            return Product::paginate(5);
        }

        $query = Product::query();

        foreach ($filters as $filter => $value) {
            if (!method_exists($this, $filter)) {
                throw new SearchQueryNotFoundException();
            }

            $query = $this->$filter($value, $query);
        }

        return $query->paginate(5);
    }
    public function category(int $categoryId, Builder $query): Builder
    {

        return $query->where("category_id", $categoryId);
    }
    public function name(string $productName, Builder $query): Builder
    {
        return $query->where("name", "LIKE", "%{$productName}%");
    }
}
