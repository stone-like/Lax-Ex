<?php

namespace App\ModelAndRepository\Addresses\Requests;



use Illuminate\Foundation\Http\FormRequest;


class CreateAddressRequest extends FormRequest
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
            "zip" => ["required"],
            "address1" => ["required"],
            "prefecture_id" => ["exists:prefectures,id"],
            "userName" => ["required"],

        ];
    }
}
