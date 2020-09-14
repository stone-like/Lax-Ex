<?php

namespace App\ModelAndRepository\Auth\Repository;

use App\ModelAndRepository\Auth\Repository\AuthRepositoryInterface;

class AuthRepository implements AuthRepositoryInterface
{
    public function checkAuth(): bool
    {
        $test = auth()->check();
        return $test;
    }
}
