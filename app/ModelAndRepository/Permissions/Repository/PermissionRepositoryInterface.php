<?php

namespace App\ModelAndRepository\Permissions\Repository;

use Illuminate\Support\Collection;
use Spatie\Permission\Contracts\Permission;

interface PermissionRepositoryInterface
{
    public function createPermission(string $name): Permission;
    public function updatePermission(int $id, string $name): Permission;
    public function deletePermission(int $id);
    public function findPermissionById(int $id): Permission;
    public function getAllPermissionExceptSuperAdminPerm(): Collection;
}
