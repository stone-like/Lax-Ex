<?php

namespace App\Http\Controllers\Admin\Auth;



use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\ModelAndRepository\Admins\Repository\AdminRepositoryInterface;
use App\ModelAndRepository\Carts\Repository\CartRepositoryInterface;
use App\ModelAndRepository\Carts\ShoppingCart;

class LoginController extends Controller
{

    // private $cartRepo;
    // public function __construct(CartRepositoryInterface $cartRepo)
    // {
    //     parent::__construct();
    //     $this->cartRepo = $cartRepo;
    // }


    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    //ここの$redirect関連はfront側でいろいろやりたいのでしなくてもいい
    protected $redirectTo = "admin/home";

    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);


        // if ($response = $this->authenticated($request, $this->guard()->user())) {
        //     return [
        //         "name" => $request->name,
        //         "email" => $request->email,
        //         "permissions" => []
        //     ];
        // }

        // dump("adminlogin", $this->guard()->check());//ここでチェック成功するのはlogin時はthis->userが入っているから、this->userが消えてsessionからとらなくてはいけないときは成功しない
        $permissions = $this->guard()->user()->getPermissionsViaRoles();
        $role = $this->guard()->user()->roles()->first();
        $roleName = $role->name ?? "undefined";
        $role_id = $role->id ?? null;


        return [
            "id" => $this->guard()->user()->id,
            "name" => $this->guard()->user()->name,
            "email" => $this->guard()->user()->email,
            "permissions" => $permissions,
            "role" => $roleName,
            "role_id" => $role_id
        ];
    }

    protected function guard()
    {


        return Auth::guard("admin");
    }

    public function logout(Request $request)
    {

        Auth::guard("admin")->logout();
        $request->session()->flush();
        $request->session()->regenerate();

        return redirect("/admin/login");
    }
}
