<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\DTO\Shippings\ShippingDTO;
use App\ModelAndRepository\Carts\Repository\CartRepositoryInterface;
use App\ModelAndRepository\Shippings\Requests\CreateShippingRequest;
use App\ModelAndRepository\Shippings\Requests\DeleteShippingRequest;
use App\ModelAndRepository\Shippings\Requests\UpdateShippingRequest;
use App\ModelAndRepository\Shippings\Repository\ShippingRepositoryInterface;

class ShippingController extends Controller
{
    private $shippingRepo;
    private $cartRepo;

    public function __construct(ShippingRepositoryInterface $shippingRepo, CartRepositoryInterface $cartRepo)
    {
        $this->shippingRepo = $shippingRepo;
        $this->cartRepo = $cartRepo;
    }
    public function createShipping(CreateShippingRequest $request)
    {
        $this->shippingRepo->createShipping($request->name, $request->price);
    }
    public function updateShipping(int $id, UpdateShippingRequest $request)
    {
        $this->shippingRepo->updateShipping($id, $request->name, $request->price);
    }
    public function deleteShipping(int $id, DeleteShippingRequest $request)
    {
        $this->shippingRepo->deleteShipping($id);
    }
    public function searchByName(Request $request)
    {
        return $this->shippingRepo->searchByName($request->name);
    }
    public function getAllShippingForUser()
    {

        $shippingFeeValue = $this->cartRepo->getShippingFee();
        $shipping = $this->shippingRepo->findShippingByPrice($shippingFeeValue);
        $shippingList = $this->shippingRepo->getAllShipping();

        return ShippingDTO::createShippingInfoArray($shipping->id, $shippingList->toArray());
    }

    public function getAllShipping()
    {
        $shippingList = $this->shippingRepo->getAllShipping();
        return $shippingList;
    }
}
