<?php

namespace Tests;


use Spatie\Permission\Models\Role;
use App\ModelAndRepository\Users\User;
use App\ModelAndRepository\Admins\Admin;
use Spatie\Permission\Models\Permission;
use App\ModelAndRepository\Products\Product;
use App\ModelAndRepository\Categories\Category;
use App\ModelAndRepository\Prefectures\Prefecture;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\ModelAndRepository\OrderStatuses\OrderStatus;
use App\ModelAndRepository\Carts\Repository\CartRepository;
use App\ModelAndRepository\Roles\Repository\RoleRepository;
use App\ModelAndRepository\Users\Repository\UserRepository;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use App\ModelAndRepository\BuyProducts\BuyProductRepository;
use App\ModelAndRepository\News\Repository\NewsRepository;
use App\ModelAndRepository\Admins\Repository\AdminRepository;
use App\ModelAndRepository\Orders\Repository\OrderRepository;
use App\ModelAndRepository\Payments\Repository\StripeRepository;
use App\ModelAndRepository\Products\Repository\ProductRepository;
use App\ModelAndRepository\Addresses\Repository\AddressRepository;
use App\ModelAndRepository\Discounts\Repository\DiscountRepository;
use App\ModelAndRepository\Shippings\Repository\ShippingRepository;
use App\ModelAndRepository\Categories\Repository\CategoryRepository;
use App\ModelAndRepository\Permissions\Repository\PermissionRepository;
use App\ModelAndRepository\Prefectures\Repository\PrefectureRepository;
use App\ModelAndRepository\OrderStatuses\Repository\OrderStatusRepository;
use App\ModelAndRepository\ProductImages\Repository\ProductImageRepository;


abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, RefreshDatabase;

    protected $cateRepo;
    protected $proRepo;
    protected $proImageRepo;
    protected $adminRepo;
    protected $roleRepo;
    protected $permRepo;
    protected $cartRepo;
    protected $addressRepo;
    protected $userRepo;
    protected $discountRepo;
    protected $shippingRepo;
    protected $buyProRepo;
    protected $newsRepo;
    protected $testCategory;
    protected $testProduct;


    public function setUp(): void
    {
        parent::setUp();
        $this->testCategory = factory(Category::class)->create();
        $this->testProduct = factory(Product::class)->create(["category_id" => $this->testCategory->id]);
        $this->cateRepo = new CategoryRepository();
        $this->proRepo = new ProductRepository();
        $this->proImageRepo = new ProductImageRepository();
        $this->adminRepo = new AdminRepository();
        $this->roleRepo = new RoleRepository();
        $this->permRepo = new PermissionRepository();
        $this->cartRepo = new  CartRepository();
        $this->addressRepo = new AddressRepository();
        $this->prefectureRepo = new PrefectureRepository();
        $this->paymentRepo = new StripeRepository();
        $this->userRepo = new UserRepository();
        $this->discountRepo = new DiscountRepository();
        $this->shippingRepo = new ShippingRepository();
        $this->orderRepo = new OrderRepository();
        $this->orderStatusRepo = new OrderStatusRepository();
        $this->buyProRepo = new BuyProductRepository();
        $this->newsRepo = new NewsRepository();




        OrderStatus::create(["name" => "shipping"]);
        OrderStatus::create(["name" => "shipped"]);

        factory(Prefecture::class, 3)->create();

        $roles = [
            "superadmin",
            "admin",
            "staff"
        ];
        foreach ($roles as $role) {
            Role::create(["guard_name" => "admin", "name" => $role]);
        };
        // $permissions = [
        //     "changeProduct",
        //     "changeUserAccount",
        //     "createRoleAndPerm"
        // ];
        // foreach ($permissions as $permission) {
        //     Permission::create(["guard_name" => "admin", "name" => $permission]);
        // };

        // $role = Role::findByName("superadmin", "admin");
        // $role->givePermissionTo($permissions);

        // $permissions = [
        //     "changeProduct",
        //     "changeUserAccount"
        // ];

        // $role = Role::findByName("admin", "admin");
        // $role->givePermissionTo($permissions);

        // $permissions = [
        //     "changeProduct"
        // ];
        // $role = Role::findByName("staff", "admin");
        // $role->givePermissionTo($permissions);
    }

    protected function adminSignIn($admin = null)
    {
        $admin = $admin ?: factory(Admin::class)->create();
        $this->actingAs($admin, "admin"); //ここの台に引数にしっかりguardNameを入れないとguardがadminとしてloginしてないことになりAuthManagerのsessionGuard付近でバグがでる
        //actingAs→beの流れを見れば第二引数をもとにsetUserしていることがわかるので気を付けよう。
        return $admin;
    }

    protected function signIn($user = null)
    {
        $user = $user ?: factory(User::class)->create();
        $this->actingAs($user);
        return $user;
    }

    protected function createRoleAssignTargetPermission(array $permissionNameList, string $roleName = null): Role
    {
        if ($roleName === null) {
            $roleName = "testRole";
        }
        //findRoleByIdの第二引数、guard_nameをしっかり入れないとちゃんとかえってこない,今回はrepositoryのほうで入れてしまっている


        $role = Role::findOrCreate($roleName, "admin");

        foreach ($permissionNameList as $permissionName) {
            $permission = Permission::create(["guard_name" => "admin", "name" => $permissionName]);
            $role->givePermissionTo($permissionName);
        }


        return $role;
    }
}
