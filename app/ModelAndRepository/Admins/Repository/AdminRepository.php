<?php

namespace App\ModelAndRepository\Admins\Repository;

use App\ModelAndRepository\Admins\Admin;
use App\Exceptions\AdminNotFoundException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;
use Spatie\Permission\Contracts\Role;

class AdminRepository implements AdminRepositoryInterface
{
    public function assignRole(int $id, Role $role)
    {
        $admin = $this->findAdminById($id);
        $admin->assignRole($role);
    }
    public function syncRoles(int $id, Role $role)
    {
        $admin = $this->findAdminById($id);
        $admin->syncRoles($role);
    }
    public function removeRole(int $id, Role $role)
    {
        $admin = $this->findAdminById($id);
        $admin->removeRole($role);
    }
    //whereInをつかってリレーション先のroleでsuperadminを持っているものを除外したいんだけどちょっと実装が重いのでwhereHasで
    //toDo:whereInにしよう
    public function getAllAdminExceptSuperAdmin(): Collection
    {
        //roleなしの奴も欲しい,queryが二回になってしまうのは改善しないといけない
        return $this->exceptSuperAdmin(Admin::all());
    }
    public function searchByName(string $name): Collection
    {
        return  $this->exceptSuperAdmin(Admin::where("name", "LIKE", "%{$name}%")->get());
    }
    public function findAdminById(int $id)
    {
        try {
            return Admin::where("id", $id)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            throw new AdminNotFoundException($e->getMessage());
        }
    }

    public function exceptSuperAdmin(Collection $adminList): Collection
    {
        $adminId = Admin::whereHas("roles", function ($query) {
            $query->whereIn("name", ["superadmin"]);
        })->first()->id;
        return $adminList->except([$adminId]);
    }
}
