<?php

namespace App\ModelAndRepository\Roles\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PermissionRequest extends FormRequest
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
    protected function failedValidation(Validator $validator)
    {

        $validateArray = array_keys($validator->errors()->toArray());
        $errors = [];

        if (preg_grep("/ids/", $validateArray)) {
            $errors += ["permission_id" => "these permission Ids is invalid"];
        }
        if (preg_grep("/role/", $validateArray)) {
            $errors += ["role_id" => "this role_id is invalid"];
        }
        $response['errors']  = $errors;
        throw new HttpResponseException(
            response()->json($response, 422)
        );
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "role_id" => ["exists:roles,id"],
            "permission_ids.*" => ["exists:permissions,id"]
        ];
    }
}
