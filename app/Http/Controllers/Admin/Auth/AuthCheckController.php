<?php

namespace App\Http\Controllers\Admin\Auth;

use App\DTO\AuthCheck\AuthCheckDTO;
use App\Http\Controllers\Controller;
use App\ModelAndRepository\Auth\Repository\AuthRepositoryInterface;

class AuthCheckController extends Controller
{
    private $authRepo;
    public function __construct(AuthRepositoryInterface $authRepo)
    {
        $this->authRepo = $authRepo;
    }

    public function checkAuth()
    {
        return AuthCheckDTO::createAuthObj($this->authRepo->checkAuth());
    }
}
