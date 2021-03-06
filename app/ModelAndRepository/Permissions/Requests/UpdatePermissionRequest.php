<?php

namespace App\ModelAndRepository\Permissions\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePermissionRequest extends FormRequest
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
            "permission_id" => ["required", "exists:permissions,id"],
            "name" => ["required", Rule::unique("permissions")->ignore((int)$this->id)],
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
            "permission_id" => $this->id
        ]);
    }
}
