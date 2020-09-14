<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\ModelAndRepository\Users\User;
use App\ModelAndRepository\Admins\Admin;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_register_user()
    {
        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ];
        $this->post("/api/register", $data);
        $this->assertDatabaseHas("users", ["email" => $data["email"]]);
    }

    /** @test */
    public function user_register_return_empty_permission()
    {
        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ];
        $user = $this->post("/api/register", $data);
        $this->assertCount(0, $user["permissions"]);
    }

    /** @test */
    public function user_login_return_empty_permission()
    {

        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ];
        $user = $this->post("/api/register", $data);

        $data = [
            "email" => "test@gmail.com",
            "password" => "testtest",
        ];

        $user = $this->post("/api/login", $data);
        $this->assertCount(0, $user["permissions"]);
    }

    /** @test */
    public function invalid_when_password_size_under_6()
    {

        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "t",
            "password_confirmation" => "t" //confirmが必要
        ];
        $this->post("/api/register", $data)->assertSessionHasErrors("password");
    }

    /** @test */
    public function permissioned_admin_can_register_admin()
    {
        //superadminとadminのみadminを作れる、staffは作れない
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createAdmin"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //adminでログイン

        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ];
        $this->post("/api/admin/register", $data);
        $this->assertDatabaseHas("admins", ["name" => "test"]);
    }

    /** @test */
    public function non_permissioned_admin_can_register_admin()
    {
        //superadminとadminのみadminを作れる、staffは作れない
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["dummy"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ];
        $this->post("/api/admin/register", $data)->assertStatus(403);
    }

    /** @test */
    public function admin_login_return_permissions_and_role()
    {
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createAdmin", "attachRoleAndPerm"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin);

        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ]; //←adminIDが２
        $this->post("/api/admin/register", $data);

        $role = $this->roleRepo->findRoleByName("admin");
        $role->givePermissionTo("createAdmin");
        $role->givePermissionTo("attachRoleAndPerm");

        $admin = Admin::where("name", "test")->first();
        $this->adminRepo->assignRole($admin->id, $role->fresh()); //この２はadminのidで、本当は２って数字だけじゃわからないのでこういうtestは良くない

        $data = [
            "email" => "test@gmail.com",
            "password" => "testtest",
        ];

        $adminJson = $this->post("api/admin/login", $data);

        $this->assertCount(2, $adminJson["permissions"]); //testではadminのpermissionは２つ
        $this->assertEquals("admin", $adminJson["role"]);
    }

    /** @test */
    public function admin_login_return_undefined_when_role_is_not_assigned()
    {
        $this->withoutExceptionHandling();
        $admin = factory(Admin::class)->create();
        $role = $this->createRoleAssignTargetPermission(["createAdmin"]);
        $admin->assignRole($role->name);
        $this->adminSignIn($admin); //adminでログイン

        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ]; //←adminIDが２
        $this->post("/api/admin/register", $data);

        $data = [
            "email" => "test@gmail.com",
            "password" => "testtest",
        ];

        $adminJson = $this->post("api/admin/login", $data);
        $this->assertEquals("undefined", $adminJson["role"]);
    }

    /** @test */
    public function user_login_and_register_returns_undefiend_role()
    {


        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ]; //←adminIDが２
        $registeredUser = $this->post("/api/register", $data);
        $this->assertEquals("undefined", $registeredUser["role"]);

        $data = [
            "email" => "test@gmail.com",
            "password" => "testtest",
        ];
        $loggedInUser = $this->post("/api/login", $data);
        $this->assertEquals("undefined", $loggedInUser["role"]);
        dump($loggedInUser);
    }



    /** @test */
    public function after_user_logout_admin_login_can_change_session_different_from_user_session()
    {
        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ];
        $this->post("/api/register", $data);
        session()->put("test", "value");
        $this->post("/api/logout");

        $admin = factory(Admin::class)->create();
        $admin->assignRole("admin");
        $this->adminSignIn($admin);
        $this->assertNull(session()->get("test"));


        // $this->post("/api/admin/register",$data);



        // $data = [
        //     "email"=>"test@gmail.com",
        //     "password"=>"testtest"
        // ];
        // $this->post("/api/admin/login",$data);


    }

    /** @test */
    public function admin_register_keeps_current_login_state()
    {

        $admin = factory(Admin::class)->create();
        $admin->assignRole("admin");
        $this->adminSignIn($admin);

        $adminName = auth()->user()->name;
        $data = [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "testtest",
            "password_confirmation" => "testtest" //confirmが必要
        ];

        $this->post("/api/admin/register", $data);
        $this->assertEquals($adminName, auth()->user()->name);
    }
}
