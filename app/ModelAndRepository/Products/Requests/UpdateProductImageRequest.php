<?php

namespace App\ModelAndRepository\Products\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateProductImageRequest extends FormRequest
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
            $errors += ["image_id" => "invalid image id inputed..."];
        }
        if (preg_grep("/contents/", $validateArray)) {
            $errors += ["imageContent" => "must input valid image Data"];
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
            "image_contents.*" => ["image"],
            "image_ids.*" => ["exists:product_images,id"],
        ];
    }
}
