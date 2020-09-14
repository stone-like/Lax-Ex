<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DTO\Addresses\AddressDTO;
use Illuminate\Support\Collection;
use App\ModelAndRepository\Addresses\Address;
use App\ModelAndRepository\Addresses\Requests\ChangeAddressRequest;
use App\ModelAndRepository\Addresses\Requests\CreateAddressRequest;
use App\ModelAndRepository\Addresses\Requests\DeleteAddressRequest;
use App\ModelAndRepository\Addresses\Requests\UpdateAddressRequest;
use App\ModelAndRepository\Users\Repository\UserRepositoryInterface;
use App\ModelAndRepository\Addresses\Repository\AddressRepositoryInterface;
use App\ModelAndRepository\Prefectures\Repository\PrefectureRepositoryInterface;

class AddressController extends Controller
{
    private $addressRepo;
    private $userRepo;
    private $prefectureRepo;

    public function __construct(AddressRepositoryInterface $addressRepo, UserRepositoryInterface $userRepo, PrefectureRepositoryInterface $prefectureRepo)
    {
        $this->addressRepo = $addressRepo;
        $this->userRepo = $userRepo;
        $this->prefectureRepo = $prefectureRepo;
    }
    public function createAddress(CreateAddressRequest $request)
    {
        $address = $this->addressRepo->createAddress($request->all());
        $this->userRepo->changeDefaultAddressId($address->id, auth()->user()->id);

        return $this->getDefaultAddress(); //returnにdefaultAddress
    }
    public function addNewAddress(CreateAddressRequest $request)
    {

        $this->addressRepo->createAddress($request->all()); //returnにexceptdefault
        return $this->getAllAddressExceptDefault();
    }

    public function deleteAddress(int $id, DeleteAddressRequest $request)
    {

        $this->addressRepo->deleteAddress($id);
        return $this->getAllAddressExceptDefault();
    }
    public function changeDefaultAddressId(ChangeAddressRequest $request)
    {
        $this->userRepo->changeDefaultAddressId($request->address_id, auth()->user()->id);

        $defaultAddress = $this->getDefaultAddress();
        $otherAddresses = $this->getAllAddressExceptDefault();
        return AddressDTO::ReturnDefaultAndOthersAddtess($defaultAddress, $otherAddresses);
    }
    public function getDefaultAddress()
    {
        //toDo:NullObjectパターンかEitherにしてみる,nullObjectPatternを使うにはEntityを使った方が良さそうだし、やっぱり機能を追加すればするほど中途半端なパターンじゃ粗が目立ってきてしまうみたい
        //nullチェックを安心してできるのがポイントで、あとは型を?Addressみたいにnullableとしなくて済む
        //もしくはoptionalつかえばいいのか・・・？それかPHP8.0で導入されるnull安全の?->か



        $user = $this->userRepo->findUserById(auth()->user()->id);
        //auth()->userでとってきたものはキャッシュされるので、もしnullableのものをupdateで埋めたとしても、キャッシュ前に埋まっていない場合、auth()で取ってきてもまだ埋まっていないままの状態のやつが出てきてしまう,
        //なのでDBアクセスをして新しくとってくる必要がある
        $address = $this->addressRepo->getDefaultAddress($user); //nullかaddressを返す
        if ($address === null) {
            return "null"; //フロントには""で変換されてしまうみたい,"null"にすればnullが返る、null===としてもtrueになる
        }
        $prefecture = $this->prefectureRepo->findPrefectureById($address->prefecture_id);

        //addressDTOで必要なものだけ取得している、user_idとかは省いている
        return AddressDTO::AddressTransform($address->id, $address->zip, $address->address1, $prefecture->name, $address->userName, $address->address2, $address->phoneNumber);
    }
    public function getAllAddressExceptDefault()
    {

        $user = $this->userRepo->findUserById(auth()->user()->id);

        $addressList =  $this->addressRepo->getAllAddressExceptDefault($user); //[]かaddressListを返す
        if (count($addressList) === 0) {

            return [];
        }
        $prefectureList = $this->prefectureRepo->getPrefectureName($this->extractIdsFromList($addressList));
        return  AddressDTO::AddressListTransform($addressList->toArray(), $prefectureList);
    }

    public function extractIdsFromList(Collection $addressList): array
    {
        //address->prefecture_idと取らないとstringのままなので工夫がいる
        $prefectureIdList = [];
        foreach ($addressList as $address) {
            array_push($prefectureIdList, $address->prefecture_id);
        }
        return $prefectureIdList;
    }

    public function updateAddress(int $id, UpdateAddressRequest $request): Address
    {


        return $this->addressRepo->updateAddress($id, $request->all()); //
    }
}
