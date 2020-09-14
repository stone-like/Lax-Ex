<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ModelAndRepository\Discounts\Requests\CreateDiscountRequest;
use App\ModelAndRepository\Discounts\Requests\DeleteDiscountRequest;
use App\ModelAndRepository\Discounts\Repository\DiscountRepositoryInterface;

class DiscountController extends Controller
{
    //直接discountをfindすることはない(cartControllerでdiscountの値をset時に必要なだけなので)
    //discountのcreate,deleteはadmin(updateはしなくていいはず)

    private $discountRepo;
    public function __construct(DiscountRepositoryInterface $discountRepo)
    {
        $this->discountRepo = $discountRepo;
    }

    public function createDiscount(CreateDiscountRequest $request)
    {
        $discount = $this->discountRepo->createDiscount($request->discountCode, $request->discountPrice);
    }
    public function deleteDiscount(int $id, DeleteDiscountRequest $request)
    {
        $this->discountRepo->deleteDiscount($id);
    }
    public function searchByName(Request $request)
    {
        return $this->discountRepo->searchByName($request->name);
    }
    public function getAllDiscount()
    {
        return $this->discountRepo->getAllDiscount();
    }
}
