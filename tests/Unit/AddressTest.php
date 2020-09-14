<?php

namespace Tests\Unit;

use App\ModelAndRepository\Prefectures\Prefecture;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;



class AddressTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_get_prefecture()
    {
        $prefecture = factory(Prefecture::class)->create();

        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",

        ];
        $this->signIn();
        $address = $this->addressRepo->createAddress($data);
        $this->assertEquals($prefecture->name, $address->prefecture->name);
    }

    /** @test */
    public function it_can_get_default_address()
    {
        $prefecture = factory(Prefecture::class)->create();

        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",

        ];
        $user = $this->signIn();
        $address = $this->addressRepo->createAddress($data);
        $user->update(["default_address_id" => $address->id]);
        $address = $this->addressRepo->getDefaultAddress($user);
        $this->assertEquals($prefecture->name, $address->prefecture->name);
    }
    /** @test */
    public function it_can_get_all_address_except_default_address()
    {
        $prefecture = factory(Prefecture::class)->create();

        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",

        ];
        $user = $this->signIn();
        $address = $this->addressRepo->createAddress($data);
        $user->update(["default_address_id" => $address->id]);

        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test"
        ];
        $address = $this->addressRepo->createAddress($data);
        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test"
        ];
        $address = $this->addressRepo->createAddress($data);

        $addressList = $this->addressRepo->getAllAddressExceptDefault($user);
        $this->assertCount(2, $addressList);
    }
    /** @test */
    public function it_can_change_default_address()
    {
        $prefecture = factory(Prefecture::class)->create();

        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "test",

        ];
        $user = $this->signIn();
        $address = $this->addressRepo->createAddress($data);
        $user->update(["default_address_id" => $address->id]);

        $data = [
            "zip" => "333-4444",
            "address1" => "Shinjyuku 5-18-6",
            "prefecture_id" => $prefecture->id,
            "userName" => "aaa"
        ];
        $address = $this->addressRepo->createAddress($data);
        $this->userRepo->changeDefaultAddressId($address->id, $user->id);
        $address = $this->addressRepo->getDefaultAddress($user->fresh());

        $this->assertEquals("aaa", $address->userName);
    }
}
