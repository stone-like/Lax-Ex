<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use App\Http\Resources\AdminResource;
use App\ModelAndRepository\Admins\Requests\RoleRequest;
use App\ModelAndRepository\Roles\Repository\RoleRepositoryInterface;
use App\ModelAndRepository\Admins\Repository\AdminRepositoryInterface;

class AdminController extends Controller
{
    private $adminRepo;
    private $roleRepo;
    public function __construct(AdminRepositoryInterface $adminRepo, RoleRepositoryInterface $roleRepo)
    {
        $this->adminRepo = $adminRepo;
        $this->roleRepo = $roleRepo;
    }

    public function assignRole(RoleRequest $request)
    {
        //roleNameを渡すんじゃなくて、roleIdを渡してrepositoryで持ってくる方がきれいではあるけど、今回selectで選ぶ形なのでミスはなさそう(一応validationはする)
        $role = $this->roleRepo->findRoleById($request->role_id);
        $this->adminRepo->assignRole($request->admin_id, $role);
    }

    public function syncRoles(RoleRequest $request)
    {
        $role = $this->roleRepo->findRoleById($request->role_id);
        $this->adminRepo->syncRoles($request->admin_id, $role);
    }

    public function removeRole(RoleRequest $request)
    {
        $role = $this->roleRepo->findRoleById($request->role_id);
        $this->adminRepo->removeRole($request->admin_id, $role);
    }

    //resourceをつかってroleとかもつけるようにする
    public function getAllAdminExceptSuperAdmin()
    {
        return AdminResource::collection($this->adminRepo->getAllAdminExceptSuperAdmin());
    }
    public function searchByName(Request $request)
    {
        return AdminResource::collection($this->adminRepo->searchByName($request->name));
    }
}
