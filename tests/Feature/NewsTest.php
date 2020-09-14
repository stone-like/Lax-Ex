<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Tests\TestCase;
use App\ModelAndRepository\Admins\Admin;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NewsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permissioned_admin_can_create_news()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createNews"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "title" => "dummy",
            "content" => "dummyContent"
        ];
        $this->post("/api/admin/news", $data);

        $this->assertDatabaseHas("news", ["title" => "dummy", "content" => "dummyContent"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_create_news()
    {
        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createNews"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "title" => "dummy",
            "content" => "dummyContent"
        ];
        $this->post("/api/admin/news", $data)->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_update_news()
    {
        $news = $this->newsRepo->createNews("dummy", "dummyContent");

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createNews"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "title" => "updated",
            "content" => "updatedContent"
        ];
        $this->patch("/api/admin/news/" . $news->id, $data);

        $this->assertDatabaseMissing("news", ["title" => "dummy", "content" => "dummyContent"]);
        $this->assertDatabaseHas("news", ["title" => "updated", "content" => "updatedContent"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_update_news()
    {
        $news = $this->newsRepo->createNews("dummy", "dummyContent");

        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createNews"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "title" => "updated",
            "content" => "updatedContent"
        ];
        $this->patch("/api/admin/news/" . $news->id, $data)->assertStatus(403);
    }

    /** @test */
    public function error_when_invalid_news_id()
    {
        $news = $this->newsRepo->createNews("dummy", "dummyContent");

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createNews"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "title" => "updated",
            "content" => "updatedContent"
        ];
        $this->patch("/api/admin/news/6000000000", $data)->assertSessionHasErrors("news_id");
    }

    /** @test */
    public function permissioned_admin_can_delete_news()
    {
        $news = $this->newsRepo->createNews("dummy", "dummyContent");

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createNews"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $this->delete("/api/admin/news/" . $news->id);

        $this->assertDatabaseMissing("news", ["title" => "dummy", "content" => "dummyContent"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_delete_news()
    {
        $news = $this->newsRepo->createNews("dummy", "dummyContent");

        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createNews"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $this->delete("/api/admin/news/" . $news->id)->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_search_news_by_title()
    {
        $this->newsRepo->createNews("dummy", "dummyContent");
        $this->newsRepo->createNews("dummy2", "dummyContent2");

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createNews"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $newsList = json_decode($this->post("/api/admin/news/searchByTitle", ["title" => "mmy2"])->content(), true);
        $this->assertCount(1, $newsList["data"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_search_news_by_title()
    {
        $this->newsRepo->createNews("dummy", "dummyContent");
        $this->newsRepo->createNews("dummy2", "dummyContent2");

        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createNews"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $this->post("/api/admin/news/searchByTitle", ["title" => "mmy2"])->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_search_news_by_content()
    {
        $this->newsRepo->createNews("dummy", "dummyContent");
        $this->newsRepo->createNews("dummy2", "dummyContent2");

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createNews"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $newsList = json_decode($this->post("/api/admin/news/searchByContent", ["content" => "content2"])->content(), true);
        $this->assertCount(1, $newsList["data"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_search_news_by_content()
    {
        $this->newsRepo->createNews("dummy", "dummyContent");
        $this->newsRepo->createNews("dummy2", "dummyContent2");

        $admin = factory(Admin::class)->create();
        // $role = $this->createRoleAssignTargetPermission(["createNews"]);
        // $admin->assignRole($role->name);
        $this->adminSignIn($admin);


        $this->post("/api/admin/news/searchByContent", ["content" => "content2"])->assertStatus(403);
    }

    /** @test */
    public function permissioned_admin_can_get_all_news()
    {

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createNews"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->newsRepo->createNews("dummy", "dummyContent");
        $this->newsRepo->createNews("dummy2", "dummyContent2");
        $this->newsRepo->createNews("dummy3", "dummyContent3");

        $newsList = json_decode($this->get("/api/admin/news")->content(), true);
        $this->assertCount(3, $newsList["data"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_get_all_news()
    {

        $admin = factory(Admin::class)->create();
        //  $role = $this->createRoleAssignTargetPermission(["createNews"]);
        //  $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->newsRepo->createNews("dummy", "dummyContent");
        $this->newsRepo->createNews("dummy2", "dummyContent2");
        $this->newsRepo->createNews("dummy3", "dummyContent3");

        $this->get("/api/admin/news")->assertStatus(403);
    }


    /** @test */
    public function newsDTO_successfully_transform_paginate_news_list()
    {

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createNews"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->newsRepo->createNews("dummy", "dummyContent");
        $this->newsRepo->createNews("dummy2", "dummyContent2");
        $this->newsRepo->createNews("dummy3", "dummyContent3");

        $newsList = json_decode($this->get("/api/admin/news")->content(), true);
        $this->assertCount(3, $newsList["data"]);
        $this->assertEquals(3, $newsList["meta"]["total"]);
        $this->assertEquals(1, $newsList["meta"]["current_page"]);
    }

    /** @test */
    public function newsDTO_successfully_transform_data_time()
    {

        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createNews"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $this->newsRepo->createNews("dummy", "dummyContent");
        $this->newsRepo->createNews("dummy2", "dummyContent2");
        $this->newsRepo->createNews("dummy3", "dummyContent3");

        $newsList = json_decode($this->get("/api/admin/news")->content(), true);

        $newsCreated = $newsList["data"][0]["created_at"];
        $newsId  = $newsList["data"][0]["id"];
        $news = $this->newsRepo->findNewsById($newsId);
        $this->assertEquals((new Carbon($news->created_at))->toDateString(), $newsCreated);
    }

    /** @test */
    public function guest_can_get_top_news()
    {
        $this->newsRepo->createNews("dummy", "dummycontent");
        $this->newsRepo->createNews("dummy2", "dummycontent2");
        $this->newsRepo->createNews("dummy3", "dummycontent3");
        $this->newsRepo->createNews("dummy4", "dummycontent4");
        $this->newsRepo->createNews("dummy5", "dummycontent5");
        $this->newsRepo->createNews("dummy6", "dummycontent6");

        //topnewsはpaginationではない
        $newsList = json_decode($this->get("/api/topnews")->content(), true);
        $this->assertCount(5, $newsList);
    }
}
