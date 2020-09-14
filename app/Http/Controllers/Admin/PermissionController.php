<?php

namespace App\Http\Controllers\Admin;



use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use App\ModelAndRepository\Permissions\Requests\CreatePermissionRequest;
use App\ModelAndRepository\Permissions\Requests\DeletePermissionRequest;
use App\ModelAndRepository\Permissions\Requests\UpdatePermissionRequest;
use App\ModelAndRepository\Permissions\Repository\PermissionRepositoryInterface;

class PermissionController extends Controller
{
    protected $permRepo;

    public function __construct(PermissionRepositoryInterface $permRepo)
    {
        $this->permRepo = $permRepo;
    }

    public function createPermission(CreatePermissionRequest $request)
    {
        return $this->permRepo->createPermission($request->name);
    }
    public function updatePermission(int $id, UpdatePermissionRequest $request)
    {
        return  $this->permRepo->updatePermission($id, $request->name);
    }
    public function deletePermission(int $id, DeletePermissionRequest $request)
    {
        $this->permRepo->deletePermission($id);
    }
    public function getAllPermissionExceptSuperAdminPerm(): Collection
    {
        return $this->permRepo->getAllPermissionExceptSuperAdminPerm();
    }
}
