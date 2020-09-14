<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ModelAndRepository\Carts\ShoppingCart;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
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
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('guest')->except('logout');
    // }

    public function logout(Request $request)
    {



        $this->guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();



        return $this->loggedOut($request) ?: redirect('/');
    }

    //laravelなのでDTOがわりにResource使ってよさそう？,FrontのrepositoryのDTOとは揃えておこう
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

        // dump("user", auth()->user());

        return [
            "id" => $this->guard()->user()->id,
            "name" =>  $this->guard()->user()->name,
            "email" =>  $this->guard()->user()->email,
            "permissions" => [],
            "role" => "undefined"
        ];
    }

    protected function guard()
    {

        return Auth::guard("user");
    }
}
