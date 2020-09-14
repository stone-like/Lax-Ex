<?php

namespace App\ModelAndRepository\Products\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
        //updateの際自分自身は重複okとする,$thisはここではproductのこと
        return [
            "product_id" =>  ["required", "exists:products,id"],
            "name" => ["required", Rule::unique("products")->ignore((int)$this->id)],
            "quantity" => ["required", "integer"],
            "price" => ["required", "integer"],
            "weight" => ["required", "integer"],
            "category_id" => ["required", "exists:categories,id"]
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
            "product_id" => $this->id
        ]);
    }
}
