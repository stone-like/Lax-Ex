<?php

namespace App\ModelAndRepository\News\Repository;

use App\ModelAndRepository\News\News;
use App\Exceptions\NewsNotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\ModelAndRepository\News\Repository\NewsRepositoryInterface;
use Illuminate\Support\Collection;

class NewsRepository implements NewsRepositoryInterface
{
    public function createNews(string $title, string $content)
    {
        return  News::create([
            "title" => $title,
            "content" => $content
        ]);
    }
    public function updateNews(int $id, string $title, string $content)
    {
        $news = $this->findNewsById($id);
        $news->update([
            "title" => $title,
            "content" => $content
        ]);
    }
    public function deleteNews(int $id)
    {
        $news = $this->findNewsById($id);
        $news->delete();
    }

    public function getAllNews(): LengthAwarePaginator
    {
        return News::paginate(5);
    }

    public function getTopNews(): Collection
    {
        return News::limit(5)->latest()->get();
    }

    public function findNewsById(int $id)
    {
        try {
            return News::where("id", $id)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new NewsNotFoundException($e->getMessage());
        }
    }
    public function searchByTitle(string $title): LengthAwarePaginator
    {
        return News::where("title", "LIKE", "%{$title}%")->paginate(5);
    }
    public function searchByContent(string $content): LengthAwarePaginator
    {
        return News::where("content", "LIKE", "%{$content}%")->paginate(5);
    }
}
