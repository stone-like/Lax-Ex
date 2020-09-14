<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\WithFaker;
use App\ModelAndRepository\Shippings\Shipping;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function get_object_errors_when_user_not_authorized()
    {
        $test = $this->get("/api/shippings")->assertStatus(422);
    }

    /** @test */
    public function can_get_true_when_user_loggedIn()
    {
        $this->signIn();

        $result = json_decode($this->get("/api/auth")->content(), true);
        dump($result);
        $this->assertEquals(true, $result["authCheck"]);
    }

    /** @test */
    public function can_get_false_when_user_not_loggedIn()
    {


        $result = json_decode($this->get("/api/auth")->content(), true);

        $this->assertEquals(false, $result["authCheck"]);
    }

    /** @test */
    public function can_get_true_when_admin_loggedIn()
    {
        $this->adminSignIn();

        $result = json_decode($this->get("/api/admin/auth")->content(), true);

        $this->assertEquals(true, $result["authCheck"]);
    }

    /** @test */
    public function can_get_false_when_admin_not_loggedIn()
    {


        $result = json_decode($this->get("/api/admin/auth")->content(), true);
        $this->assertEquals(false, $result["authCheck"]);
    }
}
