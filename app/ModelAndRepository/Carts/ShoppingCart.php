<?php

namespace App\ModelAndRepository\Carts;

use App\ModelAndRepository\Shippings\Shipping;
use Carbon\Carbon;
use Gloudemans\Shoppingcart\Cart;
use Illuminate\Support\Collection;
use Gloudemans\Shoppingcart\CartItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\DatabaseManager;
use Gloudemans\Shoppingcart\Contracts\InstanceIdentifier;
use Gloudemans\Shoppingcart\Exceptions\CartAlreadyStoredException;

class ShoppingCart extends Cart
{
    //modelにshippingの状態を持たせるのではなくdbと連携した方が良さそうな気もするけど、cartは一時的なものなので多分その必要はない


    protected $session;
    protected $events;
    protected $instance;
    // protected $shippingFee;

    //Cartをそのまま使ってもいいんだけど、管理のしやすさのため
    public function __construct()
    {
        $this->session = $this->getSession();
        $this->events = $this->getEvents();


        if (!$this->session->has("shippingFee")) {
            $this->session->put("shippingFee", 0); //ここでsession->putしてしまうとすでに値が入っていても上書きしてしまうのでsession->hasがいる
        }

        $this->instance('default');

        // parent::__construct($this->session, $this->events, $this->instance);
        parent::__construct($this->session, $this->events);
    }

    public function instance($instance = null)
    {
        // $instance = $instance ?: self::DEFAULT_INSTANCE;
        $instance = $instance ?: "default";
        dump("instance", $instance);

        if ($instance instanceof InstanceIdentifier) {
            $this->discount = $instance->getInstanceGlobalDiscount();
            $instance = $instance->getInstanceIdentifier();
        }


        $this->instance = sprintf('%s.%s', 'cart', $instance);

        return $this;
    }



    public function getSession()
    {
        return app()->make("session");
    }
    public function getEvents()
    {
        return app()->make("events");
    }

    //このget,setの生存期間はmodelと同じspanなので新たに作り直すと無かったことになる、dbと繋げないといけないかも,associateは個別のcartItemに対してなのでちょっとやりたいことと違う,なのでgetContentから攻めてみる
    //contentはsessionを介してつくられていて、さらにDBへのcontentの永続化もsessionから取得して、それをserializeすることであらかじめconfigで指定したtableに入れている、なのでcontentをとってきて、contentにput指定すればいいかな
    //構造としてはsessionでinstanceとcontentをbindしている
    public function setShippingFee(int $shippingFee)
    {
        $this->session->put("shippingFee", $shippingFee);
    }
    public function getShippingFee()
    {

        return  $this->session->get("shippingFee");
    }
    public function clearShippingFee()
    {
        $this->session->forget("shippingFee");
    }

    // public function setDiscountId(int $discount_id)
    // {
    //     $this->session->put("discount_id", $discount_id);
    // }
    // public function getDiscountId()
    // {
    //     return  $this->session->get("discount_id");;
    // }

    public function getConn()
    {
        $connectionName = $this->getConnName();
        return app(DatabaseManager::class)->connection($connectionName);
    }

    public function getTblName()
    {
        return config('cart.database.table', 'shoppingcart');
    }

    public function getConnName()
    {
        $connection = config('cart.database.connection');
        return is_null($connection) ? config('database.default') : $connection;
    }

    public function checkIdentifier(string $identifier): bool
    {
        return $this->getConn()->table($this->getTblName())->where('identifier', $identifier)->exists();
    }

    public function storedCartWithIdentifierExists($identifier)
    {
        return $this->getConn()->table($this->getTblName())->where('identifier', $identifier)->exists();
    }

    public function store($identifier)
    {
        $content = $this->getContent();
        $shippingFee  = $this->getShippingFee();
        if ($identifier instanceof InstanceIdentifier) {
            $identifier = $identifier->getInstanceIdentifier();
        }

        if ($this->storedCartWithIdentifierExists($identifier)) {
            throw new CartAlreadyStoredException("A cart with identifier {$identifier} was already stored.");
        }

        $this->getConn()->table($this->getTblName())->insert([
            'identifier' => $identifier,
            'instance'   => $this->currentInstance(),
            'content'    => serialize($content),
            'created_at' => $this->createdAt ?: Carbon::now(),
            'updated_at' => Carbon::now(),
            "shippingFee" => $shippingFee,
        ]);

        $this->events->dispatch('cart.stored');
    }

    public function merge($identifier, $keepDiscount = false, $keepTax = false, $dispatchAdd = true)
    {
        if (!$this->storedCartWithIdentifierExists($identifier)) {
            return false;
        }

        $stored = $this->getConn()->table($this->getTblName())
            ->where('identifier', $identifier)->first();

        $storedContent = unserialize($stored->content);

        foreach ($storedContent as $cartItem) {
            $this->addCartItem($cartItem, $keepDiscount, $keepTax, $dispatchAdd);
        }

        $this->setShippingFee($stored->shippingFee);

        $this->events->dispatch('cart.merged');

        return true;
    }
    public function getDBContent($identifier)
    {
        if ($identifier instanceof InstanceIdentifier) {
            $identifier = $identifier->getInstanceIdentifier();
        }




        if (!$this->storedCartWithIdentifierExists($identifier)) {
            // dump("not exists");
            return;
        }
        // dump("exists");
        $stored = $this->getConn()->table($this->getTblName())
            ->where('identifier', $identifier)->first();

        $storedContent = unserialize(data_get($stored, 'content'));

        return $storedContent;
    }

    public function restore($identifier)
    {
        if ($identifier instanceof InstanceIdentifier) {
            $identifier = $identifier->getInstanceIdentifier();
        }

        if (!$this->storedCartWithIdentifierExists($identifier)) {
            return;
        }


        $stored = $this->getConn()->table($this->getTblName())
            ->where('identifier', $identifier)->first();

        $storedContent = unserialize(data_get($stored, 'content'));

        $currentInstance = $this->currentInstance();

        $this->instance(data_get($stored, 'instance'));
        $content = $this->getContent();

        foreach ($storedContent as $cartItem) {
            $content->put($cartItem->rowId, $cartItem);
        }


        $this->events->dispatch('cart.restored');

        //この$this->instanceが親クラスにあってprivateなためエラーとなるので
        $this->session->put($this->instance, $content);
        $this->setShippingFee($stored->shippingFee);

        $this->instance($currentInstance);

        $this->createdAt = Carbon::parse(data_get($stored, 'created_at'));
        $this->updatedAt = Carbon::parse(data_get($stored, 'updated_at'));

        // $this->getConn()->table($this->getTblName())->where('identifier', $identifier)->delete();
    }

    //shippingFeeを扱えるようにtotalをoverride
    public function total($decimals = null, $decimalPoint = null, $thousandSeperator = null)
    {
        $content = $this->getContent();
        //discountをどこに対して作用させるかが重要で1400円のtax追加後に対して10%discountだと同じ10%でも
        //1540円に対しての10%となってしまうので1386円となる、これの動きを良いとするならこれでもいいが、tax追加前にしたい場合はtotalの計算をoverrideしないといけない
        //今回はOKとしている
        $total = $content->reduce(function ($total, CartItem $cartItem) {
            return $total + $cartItem->total;
        }, 0);

        //modelじゃなくてrepositoryに移した方がよさそう

        $total += $this->getShippingFee();

        return number_Format($total, $decimals, $decimalPoint, $thousandSeperator);
    }
}
