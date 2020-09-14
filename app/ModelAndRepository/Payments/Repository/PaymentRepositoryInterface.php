<?php

namespace App\ModelAndRepository\Payments\Repository;

use Stripe\Card;
use Stripe\Customer;
use App\ModelAndRepository\Users\User;
use Stripe\Token;

interface PaymentRepositoryInterface
{
    public function createCustomer($token, User $user): Customer;
    public  function updateCustomer($token, User $user);
    public function addNewCard($token, User $user);
    public function changeDefaultCardOnManual(Customer $customer, Card $newCard);
    public function deleteCard(string $card_id, User $user);
    public function getDefaultCard(User $user);
    public function charge(int $amount, string $currency, string $source_id, User $user);
    //test用
    public function getAllCharge();
}
