<?php

namespace App\ModelAndRepository\Carts\Requests;



use Illuminate\Foundation\Http\FormRequest;

class UpdateQuantityRequest extends FormRequest
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
            "rowId" => ["required"],
            "quantity" => ["required", "integer"]
        ];
    }
}
