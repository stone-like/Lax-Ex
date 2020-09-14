<?php

namespace App\ModelAndRepository\Admins\Repository;

use Illuminate\Support\Collection;
use Spatie\Permission\Contracts\Role;

interface AdminRepositoryInterface
{
    public function assignRole(int $id, Role $role);
    public function syncRoles(int $id, Role $role);
    public function removeRole(int $id, Role $role);
    public function findAdminById(int $id);
    public function searchByName(string $name): Collection;
    public function getAllAdminExceptSuperAdmin(): Collection;
}
