<?php

namespace App\ModelAndRepository\Carts\Requests;



use Illuminate\Foundation\Http\FormRequest;

class SetShippingFeeRequest extends FormRequest
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
            "shipping_id" => ["required", "exists:shippings,id"]
        ];
    }
}
