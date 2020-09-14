<?php

namespace App\ModelAndRepository\Roles\Repository;

use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;
use App\Exceptions\RoleNotFoundException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class  RoleRepository implements RoleRepositoryInterface
{

    //createRoleではarrayOrString
    public function createRole(string $name): Role
    {

        return  Role::create(["guard_name" => "admin", "name" => $name]);
    }
    public function updateRole(int $id, string $name): Role
    {
        $role = $this->findRoleById($id);
        $role->update(["name" => $name]);
        return $role->fresh();
    }
    public function deleteRole(int $id)
    {
        $role = $this->findRoleById($id);
        $role->delete();
    }

    public function getAllRoleExceptSuperAdmin(): Collection
    {
        return Role::whereNotIn("name", ["superadmin"])->get();
    }

    public function findRoleById(int $id): Role
    {
        try {
            return Role::where("id", $id)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new RoleNotFoundException($e->getMessage());
        }
    }

    public function findRoleByName(string $name): Role
    {

        return Role::findByName($name, "admin");
    }
    public function searchRoleByName(string $name): Collection
    {
        return Role::where("name", "LIKE", "%{$name}%")->whereNotIn("name", ["superadmin"])->get();
    }

    public function assignPermissions(array $permissions, int $role_id)
    {
        $role = $this->findRoleById($role_id);
        foreach ($permissions as $permission) {
            $role->givePermissionTo($permission);
        }
    }
    public function removePermissions(array $permissions, int $role_id)
    {

        $role = $this->findRoleById($role_id);
        foreach ($permissions as $permission) {

            $role->revokePermissionTo($permission);
        }
    }
    public function syncPermissions(array $permissions, int $role_id)
    {
        $role = $this->findRoleById($role_id);
        $role->syncPermissions($permissions);
    }
}
