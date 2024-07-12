<?php

namespace App\Providers;

use App\Sources\Auth\Contracts\TokenSourceInterface;
use App\Sources\Auth\Contracts\UserSourceInterface;
use App\Sources\Auth\TokenSource;
use App\Sources\Auth\UserSource;
use App\Sources\Support\BaseContracts\HttpRequestInterface;
use App\Sources\Support\HttpRequest;
use Illuminate\Support\ServiceProvider;

class SourceServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(HttpRequestInterface::class, HttpRequest::class);
        $this->app->bind(TokenSourceInterface::class, TokenSource::class);
        $this->app->bind(UserSourceInterface::class, UserSource::class);
    }
}
