<?php

namespace App\ModelAndRepository\News;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        "title",
        "content"
    ];
}
