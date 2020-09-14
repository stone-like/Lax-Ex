<?php

namespace App\ModelAndRepository\Addresses\Requests;


use App\ModelAndRepository\Users\User;
use Illuminate\Foundation\Http\FormRequest;

class DeleteAddressRequest extends FormRequest
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
        //repository以外でDBアクセスしてしまっているのでこういうところをどうにかしたい
        $default_address_id = User::where("id", auth()->user()->id)->first()->default_address_id;
        return [
            "address_id" =>  ["required", "exists:addresses,id", "not_in:{$default_address_id}"],
        ];
    }

    //ルートパラメータのidもバリデーションに含める
    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    public function validationData()
    {
        return array_merge($this->request->all(), [
            "address_id" => $this->id
        ]);
    }
}
