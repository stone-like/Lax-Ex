<?php

namespace App\ModelAndRepository\Roles;


use Illuminate\Foundation\Http\FormRequest;

class AttachPermissionRequest extends FormRequest
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
            "roleName"=>["required","exists:roles,name"],
            "permissions.*" => ["exists:permissions,name"],
            "permissions" => ["required"]
        ];
    }
}
