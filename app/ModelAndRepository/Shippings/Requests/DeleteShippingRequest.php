<?php

namespace App\ModelAndRepository\Shippings\Requests;



use Illuminate\Foundation\Http\FormRequest;

class DeleteShippingRequest extends FormRequest
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
