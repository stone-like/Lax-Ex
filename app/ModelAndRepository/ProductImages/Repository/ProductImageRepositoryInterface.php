<?php

namespace App\ModelAndRepository\ProductImages\Repository;

interface ProductImageRepositoryInterface
{
    public function saveProductImages(int $productId, array $images);
    public function updateProductImages(array $images);
    public function deleteProductImages(array $imageIds);
    public function findProductImageById(int $imageId);
    public function findProductImageByProductId(int $productId);
}
