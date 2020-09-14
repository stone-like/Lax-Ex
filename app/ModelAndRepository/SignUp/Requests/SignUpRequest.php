<?php

namespace App\ModelAndRepository\SignUp\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        
        return [
                'name' => ['required'],
                'email' => ['required', 'email', 'unique:users'],
                'password' => ['required','min:6', 'confirmed'],
        ];
    }

    public function messages(){
        return [
            "name.required" => "username is requried",
            "email.required"  => "email is required",
            "email.email" => "email is invalid",
            "email.unique" => "email must be unique",
            "password.required" => "password is required",
            "password.min" => "password is min:6",
            "password.confirmed" => "password must be same as password_confirmation"
        ];
    }
}
