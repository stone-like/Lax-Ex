<?php

namespace App\ModelAndRepository\Products\Repository;

use Illuminate\Database\Eloquent\Builder;
use App\ModelAndRepository\Products\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface
{
    public function deleteProduct(int $id): bool;
    public function updateProduct(int $id, array $params): Product;
    public function createProduct(array $params): Product;
    public function findProductById(int $id): Product;
    public function findProductBySlug(string $slug): Product;
    public function getRelatedProduct(int $category_id, int $product_id): Collection;
    public function getRecommendedProduct(): Collection;
    public function searchBySlug(string $slug): LengthAwarePaginator;
    public function searchByCategory(int $category_id): LengthAwarePaginator;
    public function searchByMultiple(array $filters): LengthAwarePaginator;
    public function category(int $categoryId, Builder $query): Builder;
    public function name(string $productName, Builder $query): Builder;
}
