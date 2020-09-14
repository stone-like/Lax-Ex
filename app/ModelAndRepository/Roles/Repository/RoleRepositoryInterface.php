<?php

namespace App\ModelAndRepository\Roles\Repository;

use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;

interface RoleRepositoryInterface
{
    public function createRole(string $name): Role;
    public function updateRole(int $id, string $name): Role;
    public function deleteRole(int $id);
    public function getAllRoleExceptSuperAdmin(): Collection;

    public function findRoleById(int $id): Role;
    public function findRoleByName(string $name): Role;
    public function searchRoleByName(string $name): Collection;

    public function assignPermissions(array $permissions, int $role_id);
    public function removePermissions(array $permissions, int $role_id);
    public function syncPermissions(array $permissions, int $role_id);
}
