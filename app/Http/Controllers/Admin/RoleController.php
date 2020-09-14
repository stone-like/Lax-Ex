<?php

namespace App\Http\Controllers\Admin;


use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\ModelAndRepository\Permissions\Repository\PermissionRepositoryInterface;
use Spatie\Permission\Contracts\Role;
use App\ModelAndRepository\Roles\AttachPermissionRequest;
use App\ModelAndRepository\Roles\Requests\CreateRoleRequest;
use App\ModelAndRepository\Roles\Requests\DeleteRoleRequest;
use App\ModelAndRepository\Roles\Requests\PermissionRequest;
use App\ModelAndRepository\Roles\Requests\UpdateRoleRequest;
use App\ModelAndRepository\Roles\Repository\RoleRepositoryInterface;

class RoleController extends Controller
{
    private $roleRepo;
    private $permRepo;

    public function __construct(RoleRepositoryInterface $roleRepo, PermissionRepositoryInterface $permRepo)
    {
        $this->roleRepo = $roleRepo;
        $this->permRepo = $permRepo;
    }

    //delete以外roleにpermissionも付属させるようにしたいのでResource
    public function createRole(CreateRoleRequest $request)
    {
        $role = $this->roleRepo->createRole($request->name);
        return new RoleResource($role);
    }
    public function updateRole(int $id, UpdateRoleRequest $request)
    {
        return new RoleResource($this->roleRepo->updateRole($id, $request->name));
    }

    public function deleteRole(int $id, DeleteRoleRequest $request)
    {
        $this->roleRepo->deleteRole($id);
    }

    public function assignPermissions(PermissionRequest $request)
    {
        //もしかしたらPermission限定ではなく抽象化してすべてものId→modelに適用してもいいかも(laravelのソースコードでやってるような抽象化)
        $permissions = $this->convertPermissionIdsToModels($request->permission_ids);
        $this->roleRepo->assignPermissions($permissions, $request->role_id);
    }
    public function removePermissions(PermissionRequest $request)
    {
        $permissions = $this->convertPermissionIdsToModels($request->permission_ids);
        $this->roleRepo->removePermissions($permissions, $request->role_id);
    }
    public function syncPermissions(PermissionRequest $request)
    {

        $permissions = $this->convertPermissionIdsToModels($request->permission_ids);

        $this->roleRepo->syncPermissions($permissions, $request->role_id);
    }

    public function convertPermissionIdsToModels(array $ids)
    {
        $models = [];
        foreach ($ids as $id) {
            $permission = $this->permRepo->findPermissionById($id);

            array_push($models, $permission);
        }

        return $models;
    }

    public function getAllRoleExceptSuperAdmin()
    {
        return RoleResource::collection($this->roleRepo->getAllRoleExceptSuperAdmin());
    }
    public function searchByName(Request $request)
    {
        return RoleResource::collection($this->roleRepo->searchRoleByName($request->name));
    }
}
