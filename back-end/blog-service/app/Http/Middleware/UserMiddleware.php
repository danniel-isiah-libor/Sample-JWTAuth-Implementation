<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Contracts\Auth\Factory as Auth;
use App\Sources\Auth\Contracts\TokenSourceInterface;
use Closure;

class UserMiddleware
{
    protected $authSource, $auth;

    public function __construct(TokenSourceInterface $authSource, Auth $auth)
    {
        $this->authSource = $authSource;
        $this->auth = $auth;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        $auth = $this->authSource->verifyToken($token);

        $user = new User(collect($auth)->all());

        $request->setUserResolver(fn () => $user);

        $this->auth->viaRequest('api', fn () => $user);

        return $next($request);
    }
}
