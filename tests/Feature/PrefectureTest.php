<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PrefectureTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_can_get_all_prefecture()
    {
        $prefectureList = json_decode($this->get("/api/prefectures")->content(), true);
        $this->assertCount(3, $prefectureList);
    }
}
