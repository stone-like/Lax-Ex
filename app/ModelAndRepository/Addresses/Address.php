<?php

namespace App\ModelAndRepository\Addresses;

use Illuminate\Database\Eloquent\Model;
use App\ModelAndRepository\Prefectures\Prefecture;

class Address extends Model
{
    protected $fillable = [
        "zip",
        "address1",
        "address2",
        "phoneNumber",
        "user_id",
        "prefecture_id",
        "cityName",
        "userName"
    ];

    public function prefecture()
    {
        return $this->belongsTo(Prefecture::class);
    }
}
