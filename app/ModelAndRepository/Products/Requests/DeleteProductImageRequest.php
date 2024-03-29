<?php

namespace App\ModelAndRepository\Products\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class DeleteProductImageRequest extends FormRequest
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

        if (preg_grep("/Ids$/", $validateArray)) {
            $errors += ["image_id" => "invalid image id inputed..."];
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
            "deleteIds" => ["exists:product_images,id"]
        ];
    }
}
