<?php

namespace App\ModelAndRepository\Admins\Requests;


use Spatie\Permission\Models\Role;
use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
        //repository以外でDBアクセスしてしまっているのでこういうところをどうにかしたい
        $superAdmin = Role::where("name", "superadmin")->first();
        return [
            "admin_id" => ["required", "exists:admins,id"],
            "role_id" => ["required", "exists:roles,id", "not_in:{$superAdmin->id}"]
        ];
    }
}
