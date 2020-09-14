<?php

namespace App\ModelAndRepository\OrderStatuses\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderStatusRequest extends FormRequest
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
            "name" => ["required", "unique:order_statuses,name"]
        ];
    }
}
