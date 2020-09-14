<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ModelAndRepository\OrderStatuses\Requests\CreateOrderStatusRequest;
use App\ModelAndRepository\OrderStatuses\Requests\DeleteOrderStatusRequest;
use App\ModelAndRepository\OrderStatuses\Repository\OrderStatusRepositoryInterface;

class OrderStatusController extends Controller
{
    private $orderStatusRepo;

    public function __construct(OrderStatusRepositoryInterface $orderStatusRepo)
    {
        $this->orderStatusRepo = $orderStatusRepo;
    }

    public function createOrderStatus(CreateOrderStatusRequest $request)
    {
        return $this->orderStatusRepo->createOrderStatus($request->name);
    }
    public function deleteOrderStatus(int $id, DeleteOrderStatusRequest $request)
    {
        return $this->orderStatusRepo->deleteOrderStatus($id);
    }
    public function getAllOrderStatus()
    {
        return $this->orderStatusRepo->getAllOrderStatus();
    }

    public function searchByName(Request $request)
    {
        return $this->orderStatusRepo->searchByName($request->name);
    }
}
