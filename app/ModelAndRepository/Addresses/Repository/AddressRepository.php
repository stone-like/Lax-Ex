<?php

namespace App\ModelAndRepository\Addresses\Repository;

use Illuminate\Support\Collection;
use App\ModelAndRepository\Users\User;
use App\Exceptions\AddressNotFoundException;
use App\ModelAndRepository\Addresses\Address;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class AddressRepository implements AddressRepositoryInterface
{
    public function createAddress(array $params): Address
    {

        $address = auth()->user()->addresses()->create($params);

        return $address;
    }
    public function updateAddress(int $id, array $params): Address
    {
        $address = $this->findAddressById($id);
        $address->update($params);
        return $address;
    }
    public function deleteAddress(int $id): bool
    {

        $address = $this->findAddressById($id);

        return $address->delete();
    }
    public function getDefaultAddress(User $user)
    {
        if (!$user->default_address_id) {
            return null;
        };

        $address = $this->findAddressById($user->default_address_id);
        return $address;
    }
    public function getAllAddressExceptDefault(User $user)
    {

        if (!$user->default_address_id) {

            return []; //そもそもdefaultがなければAddress自体ないので
        };
        return Address::all()->except([$user->default_address_id]);
    }

    public function findAddressById(int $id): Address
    {
        try {
            return Address::where("id", $id)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new AddressNotFoundException($e->getMessage());
        }
    }
}
