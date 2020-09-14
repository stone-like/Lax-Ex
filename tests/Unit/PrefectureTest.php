<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;



class PrefectureTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_get_all_prefecture()
    {
        $prefectureList = $this->prefectureRepo->getAllPrefecture();
        $this->assertCount(3, $prefectureList);
    }
}
