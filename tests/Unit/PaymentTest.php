<?php

namespace Tests\Unit;

use Tests\TestCase;
use Stripe\Exception\InvalidRequestException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Exceptions\HttpResponseException;


class PaymentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_customer_with_card()
    {
        $user = $this->signIn();
        $customer = $this->paymentRepo->createCustomer("tok_visa", $user);
        $this->assertRegExp("/cus/", $customer->id);
        $this->assertRegExp("/card/", $customer->default_source);
    }

    /** @test */
    public function it_can_update_default_card()
    {
        $user = $this->signIn();
        $customer = $this->paymentRepo->createCustomer("tok_visa", $user);
        $card_id = $customer->default_source;
        $user->update(["stripe_id" => $customer->id]);
        $updated = $this->paymentRepo->updateCustomer("tok_mastercard", $user->fresh());

        $this->assertRegExp("/card/", $customer->default_source);
        $this->assertNotEquals($card_id, $updated->default_source);
    }

    /** @test */
    public function it_can_get_default_card()
    {
        $user = $this->signIn();
        $customer = $this->paymentRepo->createCustomer("tok_visa", $user);
        $user->update(["stripe_id" => $customer->id]);
        $card = $this->paymentRepo->getDefaultCard($user->fresh());
        $this->assertRegExp("/card/", $card->id);
    }

    /** @test */
    public function it_can_charge()
    {
        $user = $this->signIn();
        $customer = $this->paymentRepo->createCustomer("tok_visa", $user);
        $user->update(["stripe_id" => $customer->id]);
        $card = $this->paymentRepo->getDefaultCard($user->fresh());
        $res = $this->paymentRepo->charge(200, "jpy", $card->id, $user->fresh());
        $this->assertEquals(200, $res->amount);
        $this->assertEquals("jpy", $res->currency);
    }

    /** @test */
    public function error_when_card_fund_is_insufficient()
    {
        $this->expectException(HttpResponseException::class);

        $user = $this->signIn();
        $customer = $this->paymentRepo->createCustomer("tok_chargeDeclinedInsufficientFunds", $user);
        $user->update(["stripe_id" => $customer->id]);
        $card = $this->paymentRepo->getDefaultCard($user->fresh());
        $res = $this->paymentRepo->charge(200, "jpy", $card->id, $user->fresh());

    }
}
