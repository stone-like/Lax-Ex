<?php

use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("/prefectures", "PrefectureController@getAllPrefecture");

Route::get("/categories", "CategoryController@getAllCategory");
Route::post("/categories/searchBySlug", "CategoryController@searchBySlug");

Route::get("/categories/{id}", "CategoryController@getEachCategory");
Route::get("/carts", "CartController@getCartItems");
Route::post("/carts", "CartController@addCartToList");
Route::patch("/carts", "CartController@updateQuantity");
Route::post("/removecarts", "CartController@removeCart");
Route::delete("/clearcart", "CartController@clearCart");

Route::post("/products", "ProductController@getProduct");
Route::post("/relatedproducts", "ProductController@getRelatedProduct");
Route::get("/recommendedproducts", "ProductController@getRecommendedProduct");



Route::post("/products/searchBySlug", "ProductController@searchBySlug");
Route::post("/products/searchByCategory", "ProductController@searchByCategory");
Route::post("/products/searchByMultiple", "ProductController@searchByMultiple");


Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');
Route::post('register', 'Auth\RegisterController@register');

Route::get("/auth", 'Auth\AuthCheckController@checkAuth');


Route::get("/topnews", "NewsController@getTopNews");


// //adminとuser共通だけどログインしていることのみ条件
// Route::group(["middleware" => ["auth:user"]], function () {
//     Route::post("/addresses", "AddressController@createAddress");
//     Route::patch("/addresses/{id}", "AddressController@updateAddress");
//     Route::delete("/addresses/{id}", "AddressController@deleteAddress");
//     Route::post("/orders", "OrderController@createOrder");

Route::group(["middleware" => ["auth:user"]], function () {
    Route::delete("/users/{id}", "UserController@deleteUser");
    Route::patch("/users/{id}", "UserController@updateUser");


    Route::post("/changeaddresses", "AddressController@changeDefaultAddressId");
    Route::post("/addresses", "AddressController@createAddress");
    Route::post("/newaddresses", "AddressController@addNewAddress");
    Route::patch("/addresses/{id}", "AddressController@updateAddress");
    Route::delete("/addresses/{id}", "AddressController@deleteAddress");
    Route::get("/addresses", "AddressController@getDefaultAddress");
    Route::get("/alladdresses", "AddressController@getAllAddressExceptDefault");

    Route::post("/chargeAndOrder", "PaymentController@chargeAndOrder");
    Route::post("/payments", "PaymentController@enterPaymentInfo");
    Route::patch("/payments", "PaymentController@enterPaymentInfo");
    Route::get("/payments", "PaymentController@getDefaultCard");

    Route::post("/cartShippings", "CartController@setShippingFee");
    Route::post("/cartDiscounts", "CartController@setDiscount");
    Route::get('/shippings', 'ShippingController@getAllShippingForUser');

    Route::get("/orders", "OrderController@getUserOrder");


    //     Route::post("/orders", "OrderController@createOrder");
});

// });

//userにもrole:userを与えるか・・・？できれば与えたくないんだけど、そうしないとpermissionのchangeUserで管理ができない
//もしくはapiを変えて同じcontrollerのmethodを配置するか


//adminlogin用
Route::group(["prefix" => "admin"], function () {

    Route::post('login', 'Admin\Auth\LoginController@login');
    Route::post('logout', 'Admin\Auth\LoginController@logout');

    Route::get("/auth", 'Admin\Auth\AuthCheckController@checkAuth');
});



//RoleBasedAuthentication
// Route::group(["prefix" => "admin", "middleware" => ["role:superadmin|admin|staff", "auth:admin"]], function () {



//     Route::post("/updateproductimages", "ProductController@updateProductImage");
//     Route::post("/saveproductimages", "ProductController@saveProductImage");
//     Route::post("/deleteproductimages", "ProductController@deleteProductImage");
//     Route::patch("/products/{id}", "ProductController@updateProduct");
//     Route::delete("/products/{id}", "ProductController@deleteProduct");
//     Route::post("/products", "ProductController@createProduct");
//     Route::post("/categories", "CategoryController@createCategory");
//     Route::patch("/categories/{id}", "CategoryController@updateCategory");
//     Route::delete("/categories/{id}", "CategoryController@deleteCategory");

//     Route::post("/users/searchByName", "UserController@searchByName");
//     Route::get("/users", "UserController@getAllUser");
// });

// Route::group(["prefix" => "admin", "middleware" => ["role:superadmin|admin", "auth:admin"]], function () {

//     Route::post("/assignroles", "Admin\AdminController@assignRole");
//     Route::post("/syncroles", "Admin\AdminController@syncRoles");
//     Route::post("/removeroles", "Admin\AdminController@removeRole");
//     Route::get("/roles", "Admin\RoleController@getAllRoleExceptSuperAdmin");
//     Route::post("/roles/searchByName", "Admin\RoleController@searchByName");

//     Route::get("/admins", "Admin\AdminController@getAllAdminExceptSuperAdmin");
//     Route::post("/admins/searchByName", "Admin\AdminController@searchByName");

//     //superadminに使う予定のpermissionはそもそも対象外にする
//     Route::post("/assignpermissions", "Admin\RoleController@assignPermissions");
//     Route::post("/syncpermissions", "Admin\RoleController@syncPermissions");
//     Route::post("/removepermissions", "Admin\RoleController@removePermissions");
//     Route::get("/permissions", "Admin\PermissionController@getAllPermissionExceptSuperAdminPerm");

//     Route::post('register', 'Admin\Auth\RegisterController@register');
// });
// Route::group(["prefix" => "admin", "middleware" => ["role:superadmin", "auth:admin"]], function () {

//     Route::patch("/roles/{id}", "Admin\RoleController@updateRole");
//     Route::delete("/roles/{id}", "Admin\RoleController@deleteRole");
//     Route::post("/roles", "Admin\RoleController@createRole");


//     Route::patch("/permissions/{id}", "Admin\PermissionController@updatePermission");
//     Route::delete("/permissions/{id}", "Admin\PermissionController@deletePermission");
//     Route::post("/permissions", "Admin\PermissionController@createPermission");
//     // Route::post("/permissions", "Admin\PermissionController@createPermission");
//     // Route::post("/attachpermissions", "Admin\RoleController@attachPermissions");
//     // Route::delete("/deleteroles","Admin\RoleController@destroyRole");
// });

//PermissionBasedRouteAuthentication
Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:changeUser"]], function () {
    Route::delete("/users/{id}", "UserController@deleteUser");
    Route::patch("/users/{id}", "UserController@updateUser");
    Route::post("/users/searchByName", "UserController@searchByName");
    Route::get("/users", "UserController@getAllUser");
});

Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:createProduct"]], function () {
    Route::post("/updateproductimages", "ProductController@updateProductImage");
    Route::post("/saveproductimages", "ProductController@saveProductImage");
    Route::post("/deleteproductimages", "ProductController@deleteProductImage");
    Route::patch("/products/{id}", "ProductController@updateProduct");
    Route::delete("/products/{id}", "ProductController@deleteProduct");
    Route::post("/products", "ProductController@createProduct");
});
Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:createCategory"]], function () {
    Route::post("/categories", "CategoryController@createCategory");
    Route::patch("/categories/{id}", "CategoryController@updateCategory");
    Route::delete("/categories/{id}", "CategoryController@deleteCategory");
});
Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:attachRoleAndPerm"]], function () {
    Route::post("/assignroles", "Admin\AdminController@assignRole");
    Route::post("/syncroles", "Admin\AdminController@syncRoles");
    Route::post("/removeroles", "Admin\AdminController@removeRole");

    Route::get("/roles", "Admin\RoleController@getAllRoleExceptSuperAdmin");
    Route::post("/roles/searchByName", "Admin\RoleController@searchByName");

    Route::get("/admins", "Admin\AdminController@getAllAdminExceptSuperAdmin");
    Route::post("/admins/searchByName", "Admin\AdminController@searchByName");

    //superadminに使う予定のpermissionはそもそも対象外にする
    Route::post("/assignpermissions", "Admin\RoleController@assignPermissions");
    Route::post("/syncpermissions", "Admin\RoleController@syncPermissions");
    Route::post("/removepermissions", "Admin\RoleController@removePermissions");
    Route::get("/permissions", "Admin\PermissionController@getAllPermissionExceptSuperAdminPerm");
});

Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:createRoleAndPerm"]], function () {
    Route::patch("/roles/{id}", "Admin\RoleController@updateRole");
    Route::delete("/roles/{id}", "Admin\RoleController@deleteRole");
    Route::post("/roles", "Admin\RoleController@createRole");


    Route::patch("/permissions/{id}", "Admin\PermissionController@updatePermission");
    Route::delete("/permissions/{id}", "Admin\PermissionController@deletePermission");
    Route::post("/permissions", "Admin\PermissionController@createPermission");
});
Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:createAdmin"]], function () {
    Route::post('register', 'Admin\Auth\RegisterController@register');
});
Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:createDiscount"]], function () {
    Route::post('/discounts', 'DiscountController@createDiscount');
    Route::delete('/discounts/{id}', 'DiscountController@deleteDiscount');
    Route::get('/discounts', 'DiscountController@getAllDiscount');
    Route::post('/discounts/searchByName', 'DiscountController@searchByName');
});
Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:createShipping"]], function () {
    Route::post('/shippings', 'ShippingController@createShipping');
    Route::patch('/shippings/{id}', 'ShippingController@updateShipping');
    Route::delete('/shippings/{id}', 'ShippingController@deleteShipping');
    Route::get('/shippings', 'ShippingController@getAllShipping');
    Route::post('/shippings/searchByName', 'ShippingController@searchByName');
});

Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:updateOrder"]], function () {
    Route::get("/orders", "OrderController@getAllOrder");
    Route::patch("/orders/{id}", "OrderController@updateOrder");
    Route::post("/orders/findByOrderStatus", "OrderController@findOrderByOrderStatusId");
});

Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:createOrderStatus"]], function () {
    Route::get("/orderStatuses", "OrderStatusController@getAllOrderStatus");
    Route::post("/orderStatuses", "OrderStatusController@createOrderStatus");
    Route::delete("/orderStatuses/{id}", "OrderStatusController@deleteOrderStatus");
    Route::post("/orderStatuses/searchByName", "OrderStatusController@searchByName");
});

Route::group(["prefix" => "admin", "middleware" => ["auth:admin", "permission:createNews"]], function () {
    Route::get("/news", "NewsController@getAllNews");
    Route::post("/news", "NewsController@createNews");
    Route::delete("/news/{id}", "NewsController@deleteNews");
    Route::patch("/news/{id}", "NewsController@updateNews");

    Route::post("/news/searchByTitle", "NewsController@searchByTitle");
    Route::post("/news/searchByContent", "NewsController@searchByContent");
});
