<?php

namespace App\ModelAndRepository\Users\Repository;

use App\ModelAndRepository\Users\User;
use Illuminate\Support\Collection;

interface UserRepositoryInterface
{
    public function deleteUser(int $id);
    public function updateUser(int $id, array $params): User;

    public function findUserById(int $id): User;
    public function searchByName(string $name): Collection;
    public function getAllUser(): Collection;
    public function bindUserAndStripeId(string $customerId, int $userId);
    public function changeDefaultAddressId(int $addressId, int $userId);
}
