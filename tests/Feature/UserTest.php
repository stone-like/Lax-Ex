<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\ModelAndRepository\Users\User;
use App\ModelAndRepository\Admins\Admin;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function permissioned_admin_can_delete_user()
    {
        $this->withExceptionHandling();
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["changeUser"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $user = factory(User::class)->create();
        $this->delete("/api/admin/users/" . $user->id);

        $this->assertDatabaseMissing("users", ["name" => $user->name]);
    }
    /** @test */
    public function non_perm_admin_can_not_delete_user()
    {
        $this->withExceptionHandling();
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $user = factory(User::class)->create();
        $this->delete("/api/admin/users/" . $user->id)->assertStatus(403);
    }
    /** @test */
    public function user_can_delete_user()
    {
        //userはadminとapiが違うだけで同じコントローラーをつかっている
        $user = factory(User::class)->create();
        $this->SignIn($user);
        $user = factory(User::class)->create();
        $this->delete("/api/users/" . $user->id);

        $this->assertDatabaseMissing("users", ["name" => $user->name]);
    }
    /** @test */
    public function guest_can_not_delete_user()
    {
        $user = factory(User::class)->create();
        $this->delete("/api/users/" . $user->id)->assertStatus(422);
    }
    /** @test */
    public function error_when_invalid_user_id_sent()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["changeUser"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $user = factory(User::class)->create();
        $this->delete("/api/admin/users/" . 600000000000)->assertSessionHasErrors("user_id");
    }

    /** @test */
    public function permissioned_admin_can_update_user()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["changeUser"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $user = factory(User::class)->create();
        $this->patch("/api/admin/users/" . $user->id, [
            "name" => "updated",
            "email" => "updated@email.com",
            "password" => "password",
            "password_confirmation" => "password"
        ]);

        $this->assertDatabaseHas("users", ["name" => "updated"]);
    }

    /** @test */
    public function non_permissioned_admin_can_not_update_user()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $user = factory(User::class)->create();
        $this->patch("/api/admin/users/" . $user->id, [
            "name" => "updated",
            "email" => "updated@email.com",
            "password" => "password",
            "password_confirmation" => "password"
        ])->assertStatus(403);
    }

    /** @test */
    public function user_can_update_user()
    {
        $user = factory(User::class)->create();
        $this->SignIn($user);
        $user = factory(User::class)->create();
        $this->patch("/api/users/" . $user->id, [
            "name" => "updated",
            "email" => "updated@email.com",
            "password" => "password",
            "password_confirmation" => "password"
        ]);

        $this->assertDatabaseHas("users", ["name" => "updated"]);
    }
    /** @test */
    public function guest_can_not_update_user()
    {
        $user = factory(User::class)->create();
        $this->patch("/api/users/" . $user->id, [
            "name" => "updated",
            "email" => "updated@email.com",
            "password" => "password",
            "password_confirmation" => "password"
        ])->assertStatus(422);
    }

    /** @test */
    public function error_when_password_confirmation_invalid()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["changeUser"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $user = factory(User::class)->create();
        $this->patch("/api/admin/users/" . $user->id, [
            "name" => "updated",
            "email" => "updated@email.com",
            "password" => "password",
            "password_confirmation" => "invalid"
        ])->assertSessionHasErrors("password");
    }

    /** @test */
    public function duplicated_email_is_ok_when_own_email()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["changeUser"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $user = factory(User::class)->create();
        $this->patch("/api/admin/users/" . $user->id, [
            "name" => "updated",
            "email" => $user->email,
            "password" => "password",
            "password_confirmation" => "password"
        ])->assertStatus(200);
    }
    /** @test */
    public function successfully_search_By_name_fired()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["changeUser"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $user = factory(User::class)->create(["name" => "test"]);
        $userList = json_decode($this->post("/api/admin/users/searchByName", ["name" => "test"])->content(), true);

        $this->assertCount(1, $userList);
    }

    /** @test */
    public function get_all_user()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["changeUser"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);
        $user = factory(User::class)->create(["name" => "test"]);
        $user = factory(User::class)->create(["name" => "test2"]);

        $userList = json_decode($this->get("/api/admin/users")->content(), true);

        $this->assertCount(2, $userList);
    }
}
