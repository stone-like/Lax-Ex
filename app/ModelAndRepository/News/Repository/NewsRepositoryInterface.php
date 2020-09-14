<?php

namespace App\ModelAndRepository\News\Repository;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface NewsRepositoryInterface
{
    public function createNews(string $title, string $content);
    public function updateNews(int $id, string $title, string $content);
    public function deleteNews(int $id);
    public function getAllNews(): LengthAwarePaginator;
    public function getTopNews(): Collection;
    public function findNewsById(int $id);
    public function searchByTitle(string $title): LengthAwarePaginator;
    public function searchByContent(string $content): LengthAwarePaginator;
}
