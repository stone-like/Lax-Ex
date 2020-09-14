<?php

namespace App\Http\Controllers;

use App\DTO\News\NewsDTO;
use Illuminate\Http\Request;

use App\ModelAndRepository\News\Requests\CreateNewsRequest;
use App\ModelAndRepository\News\Requests\DeleteNewsRequest;
use App\ModelAndRepository\News\Requests\UpdateNewsRequest;
use App\ModelAndRepository\News\Repository\NewsRepositoryInterface;

class NewsController extends Controller
{
    private $newsRepo;

    public function __construct(NewsRepositoryInterface $newsRepo)
    {
        $this->newsRepo = $newsRepo;
    }

    public function createNews(CreateNewsRequest $request)
    {
        return $this->newsRepo->createNews($request->title, $request->content);
    }

    public function updateNews(int $id, UpdateNewsRequest $request)
    {
        return $this->newsRepo->updateNews($id, $request->title, $request->content);
    }

    public function deleteNews(int $id, DeleteNewsRequest $request)
    {
        return $this->newsRepo->deleteNews($id);
    }

    public function getAllNews()
    {
        //現在["data"=>newsのArray,"per_page"=>...]みたいにdataにnewsの情報、そのほかにpagenationの情報が入っている、DTOでnewsの情報とpaginationの情報をflattenして同じ階層においてもいいかも
        //flattenするんだったら情報も変わるのでフロント側のtypescriptでの型も変更する必要があるけど・・・
        return NewsDTO::WithPagination($this->newsRepo->getAllNews()->toArray());
    }

    public function getTopNews()
    {
        return NewsDTO::createNewsArray($this->newsRepo->getTopNews()->toArray());
    }

    public function searchByTitle(Request $request)
    {
        return NewsDTO::WithPagination($this->newsRepo->searchByTitle($request->title)->toArray());
    }

    public function searchByContent(Request $request)
    {
        return NewsDTO::WithPagination($this->newsRepo->searchByContent($request->content)->toArray());
    }
}
