<?php

namespace App\ModelAndRepository\Users\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteUserRequest extends FormRequest
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
            "user_id" =>  ["required", "exists:users,id"],
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
            "user_id" => $this->id
        ]);
    }
}
