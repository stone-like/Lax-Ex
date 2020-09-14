<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use App\ModelAndRepository\Addresses\Address;
use App\ModelAndRepository\Prefectures\Prefecture;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddressTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_create_address()
    {
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $postedAddress = $this->post("/api/addresses", $data); //defaultAddressからDTOが返ってくる
        $this->assertEquals($postedAddress["address1"], $data["address1"]);
        $this->assertEquals("test", $postedAddress["userName"]);
        $this->assertEquals($prefecture->name, $postedAddress["prefectureName"]);
    }

    /** @test */
    public function guest_can_not_create_address()
    {
        // $user = $this->signIn();
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        //guestでunauthentictedの場合は500らしい、でも500はInternalErrorでは・・・？
        $this->post("/api/addresses", $data)->assertStatus(422);
    }

    /** @test */
    public function admin_can_not_create_address()
    {
        $admin = $this->adminSignIn();
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        //guardが違う場合も500みたい
        $this->post("/api/addresses", $data)->assertStatus(422);
    }
    /** @test */
    public function non_existing_prefecture_is_invalid()
    {


        $user = $this->signIn(); //一般ユーザーでlogin
        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => 600000,
            "userName" => "test",
        ];

        $this->post("/api/addresses", $data)->assertSessionHasErrors("prefecture_id");
    }

    /** @test */
    public function user_can_update_address()
    {
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $postedAddress = $this->post("/api/addresses", $data);
        $this->assertEquals("test", $postedAddress["userName"]);
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "updatedTest",
        ];
        $updated = $this->patch("/api/addresses/" . $postedAddress["id"], $data);
        $this->assertEquals("updatedTest", $updated["userName"]);
    }

    /** @test */
    public function error_when_invalid_address_id_set()
    {
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $postedAddress = $this->post("/api/addresses", $data);
        $this->assertEquals("test", $postedAddress["userName"]);
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "updatedTest",
        ];
        $this->patch("/api/addresses/600000", $data)->assertSessionHasErrors("address_id");
    }

    /** @test */
    public function user_can_delete_address()
    {
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $this->post("/api/addresses", $data);

        $data2 = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "not_defaultAddress",
        ];
        $addressList = json_decode($this->post("/api/newaddresses", $data2)->content(), true);
        $this->assertDatabaseHas("addresses", ["userName" => $data2["userName"]]);
        $this->delete("/api/addresses/" . $addressList[0]["id"]);
        $this->assertDatabaseMissing("addresses", ["userName" => $data2["userName"]]);
    }
    /** @test */
    public function user_can_get_default_address()
    {
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $postedAddress = $this->post("/api/addresses", $data);


        $address = $this->get("/api/addresses");
        $this->assertEquals("test", $address["userName"]);
    }

    /** @test */
    public function get_null_when_default_address_none()
    {
        $user = $this->signIn();



        $address = json_decode($this->get("/api/addresses")->content(), true);
        $this->assertEquals(null, $address);
    }
    /** @test */
    public function user_can_get_all_address_except_default()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];

        //prefectureのidがstringになっているバグ
        json_decode($this->post("/api/addresses", $data)->content(), true);

        $this->post("/api/newaddresses", $data);
        $this->post("/api/newaddresses", $data);



        $addressList = json_decode($this->get("/api/alladdresses")->content(), true);
        $this->assertCount(2, $addressList);
        $this->assertContains($prefecture->name, array_column($addressList, "prefectureName"));
    }

    /** @test */
    public function get_empty_array_when_default_address_none_or_exists_only_default_address()
    {
        $user = $this->signIn();
        $addressList = json_decode($this->get("/api/alladdresses")->content(), true);
        $this->assertCount(0, $addressList);


        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $postedAddress = $this->post("/api/addresses", $data);



        $addressList = json_decode($this->get("/api/alladdresses")->content(), true);
        $this->assertCount(0, $addressList);
    }

    /** @test */
    public function user_can_change_default_address()
    {
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $postedAddress = $this->post("/api/addresses", $data);
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "updated",
        ];
        $addressList = json_decode($this->post("/api/newaddresses", $data)->content(), true);

        $data = [
            "address_id" => $addressList[0]["id"]
        ];
        $this->post("/api/changeaddresses", $data);
        $address = $this->get("/api/addresses");
        $this->assertEquals("updated", $address["userName"]);
    }

    /** @test */
    public function change_default_address_return_default_and_otherAddresses()
    {
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $postedAddress = $this->post("/api/addresses", $data);
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "updated",
        ];
        $addressList = json_decode($this->post("/api/newaddresses", $data)->content(), true);

        $data = [
            "address_id" => $addressList[0]["id"]
        ];
        $defaultAndOthers = json_decode($this->post("/api/changeaddresses", $data)->content(), true);


        $allAddress = Address::all()->toArray();
        $firstAddress = $allAddress[0];
        $secondAddress = $allAddress[1];

        $this->assertEquals($secondAddress["id"], $defaultAndOthers["defaultAddress"]["id"]);
        $this->assertEquals($firstAddress["id"], $defaultAndOthers["otherAddresses"][0]["id"]);
    }

    /** @test */
    public function error_when_invalid_address_id()
    {
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $postedAddress = $this->post("/api/addresses", $data);
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "updated",
        ];
        $newAddress = $this->post("/api/newaddresses", $data);


        $data = [
            "address_id" => 8000000
        ];
        $this->post("/api/changeaddresses", $data)->assertSessionHasErrors("address_id");
    }
    /** @test */
    public function error_when_attempt_to_delete_default_address()
    {
        $user = $this->signIn();

        $prefecture = factory(Prefecture::class)->create();
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",
        ];
        $postedAddress = $this->post("/api/addresses", $data);
        $this->delete("/api/addresses/" . $postedAddress["id"])->assertSessionHasErrors("address_id");
    }
}
