<?php

namespace App\ModelAndRepository\Products\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchByMultipleRequest extends FormRequest
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
        //searchByMultipleは検索項目がない場合もあるので
        return [
            "category"=>["sometimes","exists:categories,id"]
        ];
    }
}
