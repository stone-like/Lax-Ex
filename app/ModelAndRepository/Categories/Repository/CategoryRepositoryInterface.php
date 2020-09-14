<?php

namespace App\ModelAndRepository\Categories\Repository;

use Illuminate\Support\Collection;
use App\ModelAndRepository\Categories\Category;

interface CategoryRepositoryInterface
{
    public function createCategory(string $name): Category;
    public function updateCategory(int $id, string $name): Category;
    public function deleteCategory(int $id);
    public function findCategoryById(int $id): Category;
    public function getAllCategory(): Collection;
    public function searchBySlug(string $slug): Collection;
}
