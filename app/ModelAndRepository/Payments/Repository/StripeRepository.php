<?php

namespace App\ModelAndRepository\Payments\Repository;

use Stripe\Card;
use Stripe\Token;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\StripeClient;
use App\DTO\Payments\PaymentDTO;
use Stripe\Exception\CardException;
use App\ModelAndRepository\Users\User;
use App\Exceptions\SimpleCardException;
use Stripe\Exception\ApiErrorException;
use Stripe\Exception\InvalidRequestException;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\ModelAndRepository\Payments\Repository\PaymentRepositoryInterface;
use Stripe\Exception\OAuth\InvalidRequestException as OAuthInvalidRequestException;


//CardExceptionとInvalidExceptionの二つがあるのでctachが二つになってしまう、そんなときは基底クラスを使えばいい、
//基底クラスを使ってまとめて受け取ってしまう、今二つともApiErrorExceptionを受け継いでいるのでこれを使う
class StripeRepository implements PaymentRepositoryInterface
{
    //複数のカードがある中で状態は2種類、defaultか、そうではないか
    //新しく作ったカードを使う場合今度は新しい奴がdefaultになって、旧defaultがdefault以外に入ることになる
    //default以外からdefaultに設定する機能を付けると、またdefaultの交代が起きる

    //正直updateCustomerとdeleteCardは多分使う機会ないかも
    //defaultか新しい奴を使うかの二択でいいかな、必要ありそうならフロントに実装する

    //default_sourceにはdefault_cardのidを入れる
    private $stripe;
    public function __construct()
    {
        $this->stripe = new StripeClient(config("payment.stripe_secret_key"));
    }

    //初回cardを作るときはここで賄っている,二回目以降はaddNewCardで
    public function createCustomer($token, User $user): Customer
    {
        try {
            //sourceに$tokenを設定することにより元のdefaultSourceが消え、新しく勝手にdefaultSourceにcardを配置してくれる,今回はcreateだからあまり関係ないけど

            $customer = $this->stripe->customers->create([
                "source" => $token,
                "name" => $user->name,
                "description" => $user->id
            ]);
        } catch (ApiErrorException $e) {

            $errorArray = [
                "errors" =>
                ["card" => [$e->getMessage()]]

            ];
            throw new HttpResponseException(
                response()->json($errorArray, 422)
            );
        }
        return $customer;
    }

    public  function updateCustomer($token, User $user)
    {
        try {
            //updateの時、defaultも切り替わり、card自体の情報もupdateされるのでdeleteの心配はいらない
            //sourceに$tokenを設定することにより元のdefaultSourceが消え、新しく勝手にdefaultSourceにcardを配置してくれる
            $customer =  $this->stripe->customers->retrieve($user->stripe_id, []);
            return $this->stripe->customers->update(
                $customer->id,
                [
                    "source" => $token,
                ]
            );
        } catch (ApiErrorException $e) {

            $errorArray = [
                "errors" =>
                ["card" => [$e->getMessage()]]

            ];
            throw new HttpResponseException(
                response()->json($errorArray, 422)
            );
        }


        return $customer;
    }
    //source_idはcard_idやtoken_idなど
    public function charge(int $amount, string $currency, string $source_id, User $user)
    {
        try {
            $customer =  $this->stripe->customers->retrieve($user->stripe_id, []);
            $res = $this->stripe->charges->create(
                [
                    "amount" => $amount,
                    "currency" => $currency,
                    "customer" => $customer,
                    "source" => $source_id
                ]
            );
            return $res;
        } catch (ApiErrorException $e) {

            $errorArray = [
                "errors" =>
                ["card" => [$e->getMessage()]]

            ];
            throw new HttpResponseException(
                response()->json($errorArray, 422)
            );
        }
    }

    public function getDefaultCard(User $user)
    {
        //ここでstripe_idがなくても自然
        if (is_null($user->stripe_id)) {
            return null;
        }
        $customer =  $this->stripe->customers->retrieve($user->stripe_id, []);

        if (isset($customer["default_source"]) && $customer["default_source"]) {
            $card = $this->stripe->customers->retrieveSource(
                $customer->id,
                $customer["default_source"],
                []
            );

            return $card;
        }
    }




    //複数枚カードを持ちたいのなら以下を実装すること
    public function addNewCard($token, User $user)
    {
        //addなのにstripe_idがないとおかしいのでexceptionを吐かせたい→stripe側でInvalidRequestExceptionを吐くようになっている,一応ここでinvalid_idじゃないかチェックした方が良さそうなので、ひとまず$customerを取ってくる
        //チェックなしでいいならそのまま$user->stripe_idを使う

        try {

            $customer =  $this->stripe->customers->retrieve($user->stripe_id, []);
            $newCard = $this->stripe->customers->createSource($customer->id, [
                "source" => $token
            ]);
            $this->changeDefaultCardOnManual($customer, $newCard);
        } catch (ApiErrorException $e) {

            $errorArray = [
                "errors" =>
                ["card" => [$e->getMessage()]]

            ];
            throw new HttpResponseException(
                response()->json($errorArray, 422)
            );
        }
    }

    public function changeDefaultCardOnManual(Customer $customer, Card $newCard)
    {
        $this->stripe->customers->update(
            $customer->id,
            ["default_source" => $newCard["id"]]
        );
    }

    //deleteするときにdefaultは消せないようにしておく？
    //自分でdefault関連のケアをしてもいいけど、stripe側でdefaultが消えた時の対応もしてくれている。
    //もしdefaultが消えたら最新のcardがdefault_sourceになるみたい、一応testでチェックはしておくけど

    //updateもaddNewcardもdeleteもフロントのUIに影響が出るのですべての情報を返してもいいかも
    public function deleteCard(string $card_id, User $user)
    {
        $customer =  $this->stripe->customers->retrieve($user->stripe_id, []);
        $this->stripe->customers->deleteSource(
            $customer->id,
            $card_id,
            []
        );
    }

    //test用
    public function getAllCharge()
    {
        return $this->stripe->charges->all(["limit" => 3]);
    }
}
