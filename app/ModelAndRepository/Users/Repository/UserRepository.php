<?php

namespace App\ModelAndRepository\Users\Repository;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use App\ModelAndRepository\Users\User;
use App\Exceptions\UserNotFoundException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepository implements UserRepositoryInterface
{
    public function deleteUser(int $id)
    {
        $user = $this->findUserById($id);
        $user->delete();
    }
    public function updateUser(int $id, array $params): User
    {
        //updateの際にpasswordを暗号化していないでそのまま入れてしまうとエラーが出てしまう
        $user = $this->findUserById($id);
        $user->update([
            "name" => $params["name"],
            "email" => $params["email"],
            "password" => Hash::make($params["password"])
        ]);
        return $user;
    }

    public function bindUserAndStripeId(string $customerId, int $userId)
    {
        $user = $this->findUserById($userId);
        $user->update([
            "stripe_id" => $customerId
        ]);

        return $user->fresh();
    }
    public function changeDefaultAddressId(int $addressId, int $userId)
    {
        $user = $this->findUserById($userId);
        $user->update([
            "default_address_id" => $addressId
        ]);
        return $user->fresh();
    }

    public function findUserById(int $id): User
    {
        try {
            return User::where("id", $id)->firstOrfail();
        } catch (ModelNotFoundException $e) {
            throw new UserNotFoundException($e->getMessage());
        }
    }
    public function searchByName(string $name): Collection
    {
        return User::where("name", "LIKE", "%{$name}%")->get();
    }
    public function getAllUser(): Collection
    {
        return User::all();
    }
}
