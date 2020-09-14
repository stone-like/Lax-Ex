<?php

namespace Tests\Unit;

use Tests\TestCase;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;



class PermissionTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function get_all_permisison_except_superadmin_permission()
    {
        Permission::create(["name" => "createRoleAndPerm"]);
        Permission::create(["name" => "dummy1"]);

        $permList = $this->permRepo->getAllPermissionExceptSuperAdminPerm();
        $this->assertCount(1, $permList);
    }

    /** @test */
    public function it_can_create_permission()
    {
        $perm = $this->permRepo->createPermission("test");
        $this->assertDatabaseHas("permissions", ["name" => "test"]);
    }
    /** @test */
    public function it_can_update_permission()
    {
        $perm = $this->permRepo->createPermission("test");
        $this->permRepo->updatePermission($perm->id, "updated");
        $this->assertDatabaseMissing("permissions", ["name" => "test"]);
        $this->assertDatabaseHas("permissions", ["name" => "updated"]);
    }
    /** @test */
    public function it_can_delete_permission()
    {
        $perm = $this->permRepo->createPermission("test");
        $this->permRepo->deletePermission($perm->id);
        $this->assertDatabaseMissing("permissions", ["name" => "test"]);
    }
}
