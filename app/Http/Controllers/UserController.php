<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

use App\ModelAndRepository\Users\User;
use App\ModelAndRepository\Users\Requests\DeleteUserRequest;
use App\ModelAndRepository\Users\Requests\UpdateUserRequest;
use App\ModelAndRepository\Users\Requests\ChangeAddressRequest;
use App\ModelAndRepository\Users\Repository\UserRepositoryInterface;

class UserController extends Controller
{
    private $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;

        // $this->middleware("auth:admin,user")->only(["deleteUser", "updateUser"]);
    }

    public function deleteUser(int $id, DeleteUserRequest $request)
    {
        $this->userRepo->deleteUser($id);
    }

    public function updateUser(int $id, UpdateUserRequest $request): User
    {
        $user = $this->userRepo->updateUser($id, $request->all());
        return $user;
    }
    public function searchByName(Request $request): Collection
    {
        return $this->userRepo->searchByName($request->name);
    }
    public function getAllUser(): Collection
    {
        return $this->userRepo->getAllUser();
    }
}
