<?php

namespace App\ModelAndRepository\Categories\Repository;

use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Exceptions\CategoryNotFoundException;
use App\ModelAndRepository\Categories\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\ModelAndRepository\Categories\Repository\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function createCategory(string $name): Category
    {
        return Category::create(["name" => $name, "slug" => Str::slug($name)]);
    }

    public function updateCategory(int $id, string $name): Category
    {
        $category = $this->findCategoryById($id);
        $category->update(
            ["name" => $name, "slug" => Str::slug($name)]
        );
        return $category->loadCount("products");
    }
    public function deleteCategory(int $id)
    {
        $category = $this->findCategoryById($id);
        $category->delete();
    }
    public function getAllCategory(): Collection
    {
        //categoryごとのproduct数も付属させる
        return Category::withCount("products")->get();
    }
    public function findCategoryById(int $id): Category
    {

        try {
            return Category::where("id", $id)->firstOrFail();
        } catch (ModelNotFoundException $e) {

            throw new CategoryNotFoundException($e->getMessage());
        }
    }
    public function searchBySlug(string $slug): Collection
    {
        return Category::where("name", "LIKE", "%{$slug}%")->get();
    }
}
