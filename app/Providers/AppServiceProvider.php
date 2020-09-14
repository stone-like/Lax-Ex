<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
        // if (strpos($uri, '/admin/') === 0 || $uri === '/admin') {
        //     config([
        //         'session.cookie' => config('const.session_cookie_admin'),
        //         'session.table' => config('const.ssession_table_admin'),
        //     ]);
        // }
        Schema::defaultStringLength(191);
    }
}
