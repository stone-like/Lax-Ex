<?php

namespace App\Http\Controllers;

use App\DTO\Carts\CartDTO;

use Illuminate\Http\Request;
use App\ModelAndRepository\Carts\Requests\AddCartRequest;
use App\ModelAndRepository\Carts\Requests\RemoveCartRequest;
use App\ModelAndRepository\Carts\Requests\SetDiscountRequest;
use App\ModelAndRepository\Carts\Requests\SetShippingFeeRequest;
use App\ModelAndRepository\Carts\Requests\UpdateQuantityRequest;
use App\ModelAndRepository\Carts\Repository\CartRepositoryInterface;
use App\ModelAndRepository\Products\Repository\ProductRepositoryInterface;
use App\ModelAndRepository\Shippings\Repository\ShippingRepositoryInterface;
use App\ModelAndRepository\Carts\Requests\SetShippingFeeRequest as RequestsSetShippingFeeRequest;
use App\ModelAndRepository\Carts\ShoppingCart;
use App\ModelAndRepository\Discounts\Repository\DiscountRepositoryInterface;

class CartController extends Controller
{
    protected $cartRepo;
    protected $proRepo;
    protected $shipRepo;
    protected $discountRepo;

    public function __construct(CartRepositoryInterface $cartRepo, ProductRepositoryInterface $proRepo, ShippingRepositoryInterface $shipRepo, DiscountRepositoryInterface $discountRepo)
    {
        $this->cartRepo = $cartRepo;
        $this->proRepo = $proRepo;
        $this->shipRepo = $shipRepo;
        $this->discountRepo = $discountRepo;
    }
    public function storeToDatabase(string $username)
    {
        $this->cartRepo->storeToDatabase($username);
    }
    public function restoreFromDatabase(string $username)
    {
        $this->cartRepo->restoreFromDatabase($username);
    }
    public function mergeTodatabase(string $username)
    {
        $this->cartRepo->mergeToDatabase($username);
    }

    //proccessDatabaseでやっていることはユーザーごとのデータベースの更新,cartに変更があるたびに発火
    public function processDatabase()
    {
        //すでにDBに存在している場合はmerge→erase→storeすればよさそう
        $identifier = CartDTO::CreateIdentifier(auth()->user()->name, auth()->user()->id);
        if ($this->cartRepo->checkIdentifier($identifier)) {
            //どうやらstoreはupdateはできないみたいなので既に存在していたらeraseしてからstore
            $this->cartRepo->eraseDatabase($identifier);
        }
        $this->storeToDatabase($identifier);
    }
    //loginしていたらadd,update,clear,removeで変更が加わるのでstoreでdatabaseに永続化
    public function addCartToList(AddCartRequest $request): array
    {
        $product = $this->proRepo->findProductById($request->product_id);
        $cartItem = $this->cartRepo->addCartToList($product, $request->quantity, $request->options);
        if (auth()->check()) {
            $this->processDatabase();
        }
        //subTotalだとint、subTotal()だと"1,400"みたいなstring
        return CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());
    }

    public function updateQuantity(UpdateQuantityRequest $request): array
    {
        $cartItem = $this->cartRepo->updateQuantity($request->rowId, $request->quantity);
        if (auth()->check()) {
            $this->processDatabase();
        }

        return CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());
    }

    public function clearCart()
    {
        $this->cartRepo->clearCart();
        if (auth()->check()) {
            $identifier = CartDTO::CreateIdentifier(auth()->user()->name, auth()->user()->id);
            $this->cartRepo->eraseDatabase($identifier);
        }
    }
    public function removeCart(RemoveCartRequest $request): array
    {
        //front用にrowIDとproductNameが欲しい
        $this->cartRepo->removeCart($request->rowId);


        if (auth()->check()) {

            $this->processDatabase();
        }

        return CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());
    }
    public function tryRestoreFromDB()
    {


        $identifier = CartDTO::CreateIdentifier(auth()->user()->name, auth()->user()->id);
        //restoreする前にsessionに値があるならそれをrestoreしてsessionに値を加えた後,もう一回DBに値を戻してupdateみたいにしてあげる

        if (count($this->cartRepo->getCartItems()) === 0) {
            return $this->restoreFromDatabase($identifier);
        }
        $this->restoreFromDatabase($identifier);
        return $this->processDatabase();
    }
    //トップメニューでもカートの個数表示が欲しいからログインと同時に取ってこなきゃいけなさそう
    //getItemsの時loginしていたらdatabaseから一旦とってくる
    public function getCartItems(): array
    {
        //restoreFromDatabaseでsessionの値が上書きされてしまっている
        if (auth()->check()) {
            $this->tryRestoreFromDB();
        }
        return CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());
    }
    //cartからorderの時はeraseDatabaseする(clearもやろう)、orderControllerのほうに置くかも
    //addCartみたいにDatabaseと同期させること、でないとrestoreFromDatabaseでsessionの値が上書きされてしまう
    //auth->checkはそもそもこのmethodがログイン前提なのでいらない
    public function setShippingFee(SetShippingFeeRequest $request)
    {
        $shipping = $this->shipRepo->findShippingById($request->shipping_id);
        $this->cartRepo->setShippingFee($shipping->price);
        $this->processDatabase();
        return CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());
    }

    public function setDiscount(SetDiscountRequest $request)
    {
        $discount = $this->discountRepo->findDiscountByDiscountCode($request->discountCode);
        $this->cartRepo->setGlobalDiscount($discount->discountPrice);
        $this->processDatabase();
        return CartDTO::FlattenCartImage($this->cartRepo->getTransfromedCartItems());
    }
}
