<?php

namespace App\Providers;




use Illuminate\Support\ServiceProvider;
use App\ModelAndRepository\Auth\Repository\AuthRepository;
use App\ModelAndRepository\Carts\Repository\CartRepository;
use App\ModelAndRepository\Roles\Repository\RoleRepository;
use App\ModelAndRepository\Users\Repository\UserRepository;
use App\ModelAndRepository\BuyProducts\BuyProductRepository;
use App\ModelAndRepository\News\Repository\NewsRepository;
use App\ModelAndRepository\Admins\Repository\AdminRepository;
use App\ModelAndRepository\Orders\Repository\OrderRepository;
use App\ModelAndRepository\Payments\Repository\StripeRepository;
use App\ModelAndRepository\Products\Repository\ProductRepository;
use App\ModelAndRepository\Addresses\Repository\AddressRepository;
use App\ModelAndRepository\Auth\Repository\AuthRepositoryInterface;
use App\ModelAndRepository\Discounts\Repository\DiscountRepository;
use App\ModelAndRepository\Shippings\Repository\ShippingRepository;
use App\ModelAndRepository\Carts\Repository\CartRepositoryInterface;
use App\ModelAndRepository\Categories\Repository\CategoryRepository;
use App\ModelAndRepository\Roles\Repository\RoleRepositoryInterface;
use App\ModelAndRepository\Users\Repository\UserRepositoryInterface;
use App\ModelAndRepository\BuyProducts\BuyProductRepositoryInterface;
use App\ModelAndRepository\News\Repository\NewsRepositoryInterface;
use App\ModelAndRepository\Admins\Repository\AdminRepositoryInterface;
use App\ModelAndRepository\Orders\Repository\OrderRepositoryInterface;
use App\ModelAndRepository\Permissions\Repository\PermissionRepository;
use App\ModelAndRepository\Prefectures\Repository\PrefectureRepository;
use App\ModelAndRepository\OrderStatuses\Repository\OrderStatusRepository;
use App\ModelAndRepository\Payments\Repository\PaymentRepositoryInterface;
use App\ModelAndRepository\Products\Repository\ProductRepositoryInterface;
use App\ModelAndRepository\Addresses\Repository\AddressRepositoryInterface;
use App\ModelAndRepository\ProductImages\Repository\ProductImageRepository;
use App\ModelAndRepository\Discounts\Repository\DiscountRepositoryInterface;
use App\ModelAndRepository\Shippings\Repository\ShippingRepositoryInterface;
use App\ModelAndRepository\Categories\Repository\CategoryRepositoryInterface;
use App\ModelAndRepository\Permissions\Repository\PermissionRepositoryInterface;
use App\ModelAndRepository\Prefectures\Repository\PrefectureRepositoryInterface;
use App\ModelAndRepository\OrderStatuses\Repository\OrderStatusRepositoryInterface;
use App\ModelAndRepository\ProductImages\Repository\ProductImageRepositoryInterface;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            AdminRepositoryInterface::class,
            AdminRepository::class
        );
        $this->app->bind(
            RoleRepositoryInterface::class,
            RoleRepository::class
        );
        $this->app->bind(
            PermissionRepositoryInterface::class,
            PermissionRepository::class
        );
        $this->app->bind(
            CategoryRepositoryInterface::class,
            CategoryRepository::class
        );
        $this->app->bind(
            ProductRepositoryInterface::class,
            ProductRepository::class
        );
        $this->app->bind(
            ProductImageRepositoryInterface::class,
            ProductImageRepository::class
        );
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );
        $this->app->bind(
            CartRepositoryInterface::class,
            CartRepository::class
        );
        $this->app->bind(
            AddressRepositoryInterface::class,
            AddressRepository::class
        );
        $this->app->bind(
            PrefectureRepositoryInterface::class,
            PrefectureRepository::class
        );
        $this->app->bind(
            PaymentRepositoryInterface::class,
            StripeRepository::class
        );
        $this->app->bind(
            DiscountRepositoryInterface::class,
            DiscountRepository::class
        );
        $this->app->bind(
            ShippingRepositoryInterface::class,
            ShippingRepository::class
        );
        $this->app->bind(
            AuthRepositoryInterface::class,
            AuthRepository::class
        );
        $this->app->bind(
            OrderStatusRepositoryInterface::class,
            OrderStatusRepository::class
        );
        $this->app->bind(
            OrderRepositoryInterface::class,
            OrderRepository::class
        );
        $this->app->bind(
            BuyProductRepositoryInterface::class,
            BuyProductRepository::class
        );
        $this->app->bind(
            NewsRepositoryInterface::class,
            NewsRepository::class
        );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
