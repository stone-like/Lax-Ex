<?php

namespace App\ModelAndRepository\Auth\Repository;

interface AuthRepositoryInterface
{
    public function checkAuth(): bool;
}
