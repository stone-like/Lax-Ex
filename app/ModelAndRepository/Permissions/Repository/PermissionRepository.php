<?php

namespace App\ModelAndRepository\Permissions\Repository;

use ReflectionClass;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use App\DTO\Permissions\PermissionDTO;
use Spatie\Permission\Models\Permission;
use App\Exceptions\PermissionNotFoundException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\ModelAndRepository\Permissions\Repository\PermissionRepositoryInterface;

class PermissionRepository implements PermissionRepositoryInterface
{
  public function createPermission(string $name): Permission
  {
    return Permission::create(["guard_name" => "admin", "name" => $name]);
  }
  public function updatePermission(int $id, string $name): Permission
  {
    $permission = $this->findPermissionById($id);
    $permission->update(["name" => $name]);
    return $permission;
  }
  public function deletePermission(int $id)
  {
    $permission = $this->findPermissionById($id);
    $permission->delete();
  }

  public function getAllPermissionExceptSuperAdminPerm(): Collection
  {
    //superAdmin専用のpermssionをそもそも用意せずに、superAdminというroleだけを判定方法にするという手段もあると思う、むしろそっちのほうがいいのかも,ただ、具体的に何ができるか明示できるというメリットもある
    //今のsuperAdmin専用のPermissionはroleとpermission自体のcreate,delete,update
    $superAdminPermIds = PermissionDTO::modelsToIds(Permission::where("name", "createRoleAndPerm")->get());
    return Permission::whereNotIn("id", $superAdminPermIds)->get();
  }

  public function findPermissionById(int $id): Permission
  {
    try {
      return Permission::where("id", $id)->firstOrFail();
    } catch (ModelNotFoundException $e) {
      throw new PermissionNotFoundException($e->getMessage());
    }
  }
}
