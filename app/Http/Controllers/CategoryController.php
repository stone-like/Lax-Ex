<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exceptions\CategoryNotFoundException;
use App\ModelAndRepository\Categories\Category;
use App\ModelAndRepository\Categories\Requests\CreateCategoryRequest;
use App\ModelAndRepository\Categories\Requests\DeleteCategoryRequest;
use App\ModelAndRepository\Categories\Requests\UpdateCategoryRequest;
use App\ModelAndRepository\Categories\Repository\CategoryRepositoryInterface;

class CategoryController extends Controller
{
    private $cateRepo;

    public function __construct(CategoryRepositoryInterface $cateRepo)
    {
        $this->cateRepo = $cateRepo;
    }

    public function createCategory(CreateCategoryRequest $request): Category
    {
        return $this->cateRepo->createCategory($request->name);
    }
    public function updateCategory(int $id, UpdateCategoryRequest $request): Category
    {

        return $this->cateRepo->updateCategory($id, $request->name);
    }
    public function deleteCategory(int $id, DeleteCategoryRequest $request)
    {

        return $this->cateRepo->deleteCategory($id);
    }
    public function searchBySlug(Request $request)
    {

        return $this->cateRepo->searchBySlug($request->slug);
    }
    public function getAllCategory()
    {
        return $this->cateRepo->getAllCategory();
    }
}
