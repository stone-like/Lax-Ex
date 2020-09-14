<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class NewsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_news()
    {
        $this->newsRepo->createNews("dummy", "dummycontent");
        $this->assertDatabaseHas("news", ["title" => "dummy", "content" => "dummyContent"]);
    }

    /** @test */
    public function it_can_update_news()
    {
        $news = $this->newsRepo->createNews("dummy", "dummycontent");
        $this->assertDatabaseHas("news", ["title" => "dummy", "content" => "dummyContent"]);

        $this->newsRepo->updateNews($news->id, "updated", "updatedContent");
        $this->assertDatabaseMissing("news", ["title" => "dummy", "content" => "dummyContent"]);
        $this->assertDatabaseHas("news", ["title" => "updated", "content" => "updatedContent"]);
    }
    /** @test */
    public function it_can_delete_news()
    {
        $news = $this->newsRepo->createNews("dummy", "dummycontent");
        $this->assertDatabaseHas("news", ["title" => "dummy", "content" => "dummyContent"]);

        $this->newsRepo->deleteNews($news->id);
        $this->assertDatabaseMissing("news", ["title" => "dummy", "content" => "dummyContent"]);
    }

    /** @test */
    public function it_can_get_all_news()
    {
        $this->newsRepo->createNews("dummy", "dummycontent");
        $this->newsRepo->createNews("dummy2", "dummycontent2");
        $newsList = $this->newsRepo->getAllNews();
        $this->assertCount(2, $newsList);
    }

    /** @test */
    public function it_can_get_top_news()
    {
        $this->newsRepo->createNews("dummy", "dummycontent");
        $this->newsRepo->createNews("dummy2", "dummycontent2");
        $this->newsRepo->createNews("dummy3", "dummycontent3");
        $this->newsRepo->createNews("dummy4", "dummycontent4");
        $this->newsRepo->createNews("dummy5", "dummycontent5");
        $this->newsRepo->createNews("dummy6", "dummycontent6");

        $newsList = $this->newsRepo->getTopNews();
        $this->assertCount(5, $newsList);
    }


    /** @test */
    public function it_can_search_news_by_title()
    {
        $this->newsRepo->createNews("dummy", "dummycontent");
        $this->newsRepo->createNews("dummy2", "dummycontent2");
        $newsList = $this->newsRepo->searchByTitle("mmy2");
        $this->assertCount(1, $newsList);
    }

    /** @test */
    public function it_can_search_news_by_content()
    {
        $this->newsRepo->createNews("dummy", "dummycontent");
        $this->newsRepo->createNews("dummy2", "dummycontent2");
        $newsList = $this->newsRepo->searchByContent("content2");
        $this->assertCount(1, $newsList);
    }
}
