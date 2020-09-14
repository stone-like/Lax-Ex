<?php

namespace App\ModelAndRepository\Addresses\Requests;



use Illuminate\Foundation\Http\FormRequest;


class UpdateAddressRequest extends FormRequest
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
            "address_id" =>  ["required", "exists:addresses,id"],
            "zip" => ["required"],
            "address1" => ["required"],
            "prefecture_id" => ["exists:prefectures,id"],
            "userName" => ["required"],

        ];
    }

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
