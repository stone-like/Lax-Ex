<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\DTO\Payments\PaymentDTO;
use App\DTO\Addresses\AddressDTO;
use Illuminate\Support\Collection;
use App\ModelAndRepository\Addresses\Address;
use App\ModelAndRepository\Orders\Requests\FindOrderRequest;
use App\ModelAndRepository\Orders\Requests\UpdateOrderRequest;
use App\ModelAndRepository\Orders\Repository\OrderRepositoryInterface;
use App\ModelAndRepository\Addresses\Repository\AddressRepositoryInterface;
use App\ModelAndRepository\Prefectures\Repository\PrefectureRepositoryInterface;
use App\ModelAndRepository\OrderStatuses\Repository\OrderStatusRepositoryInterface;

class OrderController extends Controller
{
    private $orderRepo;
    private $orderStatusRepo;
    private $addressRepo;
    private $prefectureRepo;


    public function __construct(
        OrderRepositoryInterface $orderRepo,
        OrderStatusRepositoryInterface $orderStatusRepo,
        AddressRepositoryInterface $addressRepo,
        PrefectureRepositoryInterface $prefectureRepo
    ) {
        $this->orderRepo = $orderRepo;
        $this->orderStatusRepo = $orderStatusRepo;
        $this->addressRepo = $addressRepo;
        $this->prefectureRepo = $prefectureRepo;
    }

    public function getUserOrder()
    {

        $orderList = $this->orderRepo->getUserOrder(auth()->user()->id);

        $orderInfoArrayList = $this->convertOrderListToOrderInfoArrayList($orderList);

        return $orderInfoArrayList;
    }

    public function getAllOrder()
    {
        $orderList = $this->orderRepo->getAllOrder();
        $orderInfoArrayList = $this->convertOrderListToOrderInfoArrayList($orderList);

        return $orderInfoArrayList;
    }
    public function updateOrder(int $id, UpdateOrderRequest $request)
    {
        $now = Carbon::now();
        $this->orderRepo->updateOrder($id, $now, $request->order_status_id);
    }
    public function findOrderByOrderStatusId(FindOrderRequest $request)
    {
        $orderList = $this->orderRepo->findOrderByOrderStatusId($request->order_status_id);
        $orderInfoArrayList = $this->convertOrderListToOrderInfoArrayList($orderList);

        return $orderInfoArrayList;
    }

    public function convertOrderListToOrderInfoArrayList(Collection $orderList)
    {

        if (count($orderList) === 0) {
            return [];
        }

        $orderInfoArrayList = [];
        foreach ($orderList as $order) {
            $address = $this->addressRepo->findAddressById($order->address_id);
            $orderStatus = $this->orderStatusRepo->findOrderStatusById($order->order_status_id);

            $orderInfoArray = PaymentDTO::createOrderInfo($order, $this->createAddressInfoArray($address), $order->buyproducts->toArray(), $orderStatus->name);

            array_push($orderInfoArrayList, $orderInfoArray);
        }

        return $orderInfoArrayList;
    }
    public function createAddressInfoArray(Address $address)
    {
        $prefecture = $this->prefectureRepo->findPrefectureById($address->prefecture_id);

        //addressDTOで必要なものだけ取得している、user_idとかは省いている
        return AddressDTO::AddressTransform($address->id, $address->zip, $address->address1, $prefecture->name, $address->userName, $address->address2, $address->phoneNumber);
    }
}
