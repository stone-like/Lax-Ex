<?php

namespace App\Http\Controllers;

use Stripe\Token;
use Stripe\Customer;
use App\DTO\Carts\CartDTO;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\DTO\Payments\PaymentDTO;
use App\DTO\Products\ProductDTO;
use App\DTO\Addresses\AddressDTO;
use App\ModelAndRepository\Users\User;
use App\Http\Resources\ProductResource;
use App\ModelAndRepository\Orders\Order;
use App\ModelAndRepository\Addresses\Address;
use App\ModelAndRepository\Payments\Requests\ChargeRequest;
use App\ModelAndRepository\Carts\Repository\CartRepositoryInterface;
use App\ModelAndRepository\Users\Repository\UserRepositoryInterface;
use App\ModelAndRepository\Orders\Repository\OrderRepositoryInterface;
use App\ModelAndRepository\Payments\Repository\PaymentRepositoryInterface;
use App\ModelAndRepository\Products\Repository\ProductRepositoryInterface;
use App\ModelAndRepository\Addresses\Repository\AddressRepositoryInterface;
use App\ModelAndRepository\BuyProducts\BuyProductRepositoryInterface;
use App\ModelAndRepository\Prefectures\Repository\PrefectureRepositoryInterface;
use App\ModelAndRepository\OrderStatuses\Repository\OrderStatusRepositoryInterface;

class PaymentController extends Controller
{
    private $payRepo;
    private $userRepo;
    private $cartRepo;
    private $addressRepo;
    private $orderRepo;
    private $orderStatusRepo;
    private $proRepo;
    private $prefectureRepo;
    private $buyProRepo;




    public function __construct(PaymentRepositoryInterface $payRepo, UserRepositoryInterface $userRepo, CartRepositoryInterface $cartRepo, AddressRepositoryInterface $addressRepo, OrderStatusRepositoryInterface $orderStatusRepo, OrderRepositoryInterface $orderRepo, ProductRepositoryInterface $proRepo, PrefectureRepositoryInterface $prefectureRepo, BuyProductRepositoryInterface $buyProRepo)
    {
        $this->payRepo = $payRepo;
        $this->userRepo = $userRepo;
        $this->cartRepo = $cartRepo;
        $this->addressRepo = $addressRepo;
        $this->orderRepo = $orderRepo;
        $this->orderStatusRepo = $orderStatusRepo;
        $this->proRepo = $proRepo;
        $this->prefectureRepo = $prefectureRepo;
        $this->buyProRepo = $buyProRepo;
    }

    //本当にしっかり設計するならauthを使わず、user_idからrepostoryでuserをとってくる
    public function getDefaultCard()
    {
        $user = $this->userRepo->findUserById(auth()->user()->id);

        $card =  $this->payRepo->getDefaultCard($user);
        //nullの判定はDTOに押し込んだ方がいい？
        if ($card === null) {
            return "null";
        }

        return PaymentDTO::CreateCardArray($card->last4, $card->brand, $card->exp_month, $card->exp_year, $card->name);
    }


    public function createCustomer($token, User $user)
    {


        $customer = $this->payRepo->createCustomer($token, $user);
        $user = $this->userRepo->bindUserAndStripeId($customer->id, $user->id);
        $card =  $this->payRepo->getDefaultCard($user);
        if ($card === null) {
            return "null";
        }

        return PaymentDTO::CreateCardArray($card->last4, $card->brand, $card->exp_month, $card->exp_year, $card->name);
    }

    public function updateCustomer($token, User $user)
    {


        $customer = $this->payRepo->updateCustomer($token, $user);

        $card =  $this->payRepo->getDefaultCard($user);
        if ($card === null) {
            return "null";
        }
        return PaymentDTO::CreateCardArray($card->last4, $card->brand, $card->exp_month, $card->exp_year, $card->name);
    }



    public function enterPaymentInfo(Request $request)
    {
        $user = $this->userRepo->findUserById(auth()->user()->id);
        if ($user->stripe_id) {
            return $this->updateCustomer($request->token, $user);
        }

        return $this->createCustomer($request->token, $user);
    }

    public function chargeAndOrder(ChargeRequest $request)
    {

        $user = $this->userRepo->findUserById(auth()->user()->id);
        $card = $this->payRepo->getDefaultCard($user);
        $cartInfoArray = CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());
        $address = $this->addressRepo->getDefaultAddress($user);
        $orderStatus = $this->orderStatusRepo->findOrderStatusByName("shipping");

        $this->charge($cartInfoArray, $request->currency, $card->id, $user);

        $order = $this->createOrder($cartInfoArray, $address->id, $user->id, $orderStatus->id);
        //productListがほしい
        $this->clearCart($user);


        return PaymentDTO::createOrderInfo($order, $this->createAddressInfoArray($address), $order->buyproducts->toArray(), $orderStatus->name);
    }

    public function createAddressInfoArray(Address $address)
    {
        $prefecture = $this->prefectureRepo->findPrefectureById($address->prefecture_id);

        //addressDTOで必要なものだけ取得している、user_idとかは省いている
        return AddressDTO::AddressTransform($address->id, $address->zip, $address->address1, $prefecture->name, $address->userName, $address->address2, $address->phoneNumber);
    }

    //フロントのchargeで返ってくるものはchargeが失敗したならcard:対応するmessageで、成功時はbuyInformationのための情報
    public function charge(array $cartInfoArray, string $currency, string $card_id, User $user)
    {
        $intTotal = PaymentDTO::numberFormatToInt($cartInfoArray["total"]);
        $this->payRepo->charge($intTotal, $currency, $card_id, $user); //chargeのあとはエラー出たかでないかでフロント側の挙動を変えるokならorder→フロントへbuyInformationのためのデータを返してあげる、エラーならエラーページへ

    }

    public function createOrder(array $cartInfoArray, int $address_id, int $user_id, int $order_status_id)
    {
        $order = $this->orderRepo->createOrder($cartInfoArray, $address_id, $user_id, $order_status_id);
        $this->attachOrderToProduct($order, $cartInfoArray["cartItems"]);
        return $order;
    }
    public function attachOrderToProduct(Order $order, array $cartItems)
    {
        //productをそのままorderと関連付けるだけでは足りない、必要なのは元のproductの情報に加えて、
        //実際に買った数量、subtotal(数量×price)、subtotalは確かにフロントでも計算できるけどここで作っておく
        //なのでcartでもなく(orderから情報を引き出すときにはcartはもう消えている)、productでもない(実際に買った数量とsubtotalの情報が必要になる)
        //よってcartとProductを合わせたような新しいtableが必要になる、product_idとbuyQuantity、subtotalを作っておけばいいかな？,productの情報をそのまま入れると、imageが変わった時に同期が取れなくなるけど・・・買った後だから同期取れなくてもいいのかもしれない,product_idが消えるとそれはそれで問題になりそうだしどっちがいいか
        //今回はそのまま新しいtableに情報を入れてしまうことにする
        foreach ($cartItems as $cartItem) {
            // $product = $this->proRepo->findProductBySlug(Str::slug($cartItem["name"]));
            //buyProductに購入した商品の情報を保存
            $buyProduct = $this->buyProRepo->createBuyProduct($cartItem);
            $this->orderRepo->attachProduct($order, $buyProduct);
        }
    }

    public function clearCart(User $user)
    {
        $indentifier = CartDTO::CreateIdentifier($user->name, $user->id);
        $this->cartRepo->clearCart();
        $this->cartRepo->eraseDatabase($indentifier);
    }
}
