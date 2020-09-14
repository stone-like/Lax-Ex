<?php

namespace App\ModelAndRepository\Shippings\Requests;


use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateShippingRequest extends FormRequest
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
        return  [
            "name" => ["required", Rule::unique("shippings")->ignore((int)$this->id)],
            "price" => ["required"],
            "shipping_id" => ["required", "exists:shippings,id"]
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
            "shipping_id" => $this->id
        ]);
    }
}
