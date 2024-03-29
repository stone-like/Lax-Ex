<?php

namespace App\ModelAndRepository\Shippings\Requests;



use Illuminate\Foundation\Http\FormRequest;

class CreateShippingRequest extends FormRequest
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
            "name" => ["required", "unique:shippings,name"],
            "price" => ["required"]
        ];
    }
}
