<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (str_contains(Config::get('app.env'), 'production')) {
            URL::forceRootUrl(Config::get('app.url'));
            if (str_contains(Config::get('app.url'), 'https://')) {
                URL::forceScheme('https');
            }
        }
    }
}
