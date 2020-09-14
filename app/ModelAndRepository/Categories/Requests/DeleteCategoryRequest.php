<?php

namespace App\ModelAndRepository\Categories\Requests;


use Illuminate\Foundation\Http\FormRequest;

class DeleteCategoryRequest extends FormRequest
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
            "category_id" =>  ["required", "exists:categories,id"],
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
            "category_id" => $this->id
        ]);
    }
}
