<?php

namespace App\ModelAndRepository\Products\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetRelatedProductRequest extends FormRequest
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
            "category_id" => ["required", "exists:categories,id"],
            "product_id" => ["required", "exists:products,id"]
        ];
    }
}
