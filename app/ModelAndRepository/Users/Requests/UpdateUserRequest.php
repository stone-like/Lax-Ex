<?php


namespace App\ModelAndRepository\Users\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'name' => ['required'],
            'email' => ['required', 'email', Rule::unique("users")->ignore((int)$this->id)],
            'password' => ['required', 'min:6', 'confirmed'],
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
            "user_id" => $this->id
        ]);
    }
}
