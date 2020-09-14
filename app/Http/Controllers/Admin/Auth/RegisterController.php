<?php
namespace App\Http\Controllers\Admin\Auth;



use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use App\ModelAndRepository\Admins\Admin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    // protected $redirectTo = "admin/home";

    

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:admins'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
    }
    //adminを使えるように上書き
    protected function guard(){
        return Auth::guard("admin");
    }

 
    protected function create(array $data)
    {
        return Admin::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function register(Request $request)
    {
       
        
        $this->validator($request->all())->validate();
        
        event(new Registered($admin = $this->create($request->all())));
        //adminRegisterはDBに登録するだけでデータを返さない
        // $this->guard()->login($admin);

        //registerの場合は登録したばかりなのでpermissionが[]でいい
        // if ($response = $this->registered($request, $admin)) {
        //     return [
        //         "name" => $request->name,
        //         "email" => $request->email,
        //         "permissions" => []
        //     ];
        // }

        return true;
    }
}
