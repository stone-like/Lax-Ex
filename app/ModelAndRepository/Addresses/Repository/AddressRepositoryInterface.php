<?php

namespace App\ModelAndRepository\Addresses\Repository;


use Illuminate\Support\Collection;
use App\ModelAndRepository\Users\User;
use App\ModelAndRepository\Addresses\Address;

interface AddressRepositoryInterface
{
    public function createAddress(array $params): Address;
    public function updateAddress(int $id, array $params): Address;
    public function deleteAddress(int $id): bool;
    public function getDefaultAddress(User $user);
    public function getAllAddressExceptDefault(User $user);
    public function findAddressById(int $id): Address;
}
