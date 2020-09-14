<?php

namespace App\DTO\AuthCheck;

class AuthCheckDTO
{
    public static function createAuthObj(bool $bool)
    {
        return [
            "authCheck" => $bool
        ];
    }
}
