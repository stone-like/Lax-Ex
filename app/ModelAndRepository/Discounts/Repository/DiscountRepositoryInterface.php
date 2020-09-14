<?php

namespace App\ModelAndRepository\Discounts\Repository;

interface DiscountRepositoryInterface
{
    public function findDiscountByDiscountCode(string $codeName);
    public function findDiscountById(int $discount_id);
    public function createDiscount(string $discountCode, int $discountPrice);
    public function deleteDiscount(int $discount_id);
    public function searchByName(string $name);
    public function getAllDiscount();
}
