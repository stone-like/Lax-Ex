<?php

namespace App\ModelAndRepository\Addresses\Requests;



use Illuminate\Foundation\Http\FormRequest;

class ChangeAddressRequest extends FormRequest
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
            "address_id" => ["required", "exists:addresses,id"]
        ];
    }
}
