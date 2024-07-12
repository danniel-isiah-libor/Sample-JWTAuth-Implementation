<?php

namespace App\Sources\Auth;

use Illuminate\Support\Arr;

use App\Sources\Source;
use App\Sources\Auth\Contracts\TokenSourceInterface;
use App\Sources\Support\BaseContracts\HttpRequestInterface as HttpRequest;

class TokenSource extends Source implements TokenSourceInterface
{
    /**
     * @var \App\Sources\Support\BaseContracts\HttpRequestInterface
     */
    protected $httpRequest;

    /**
     * Create the source instance and declare the route endpoint.
     * 
     * @param App\Sources\Support\BaseContracts\HttpRequestInterface
     */
    public function __construct(HttpRequest $httpRequest)
    {
        $this->httpRequest = $httpRequest;

        $this->route = env('AUTH_SERVICE_URL');
        $this->id = env('JWT_CLIENT_ID');
        $this->secret = env('JWT_CLIENT_SECRET');
    }

    /**
     * Verify token.
     *
     * @param string $token
     * @return mixed
     */
    public function verifyToken($token)
    {
        $url = sprintf('%s/verify-token', $this->route);

        Arr::set($headers, 'Accept', 'application/json');
        Arr::set($headers, 'Authorization', 'Bearer ' . $token);

        return $this->httpRequest->post($url, [], $headers);
    }

    /**
     * Get JWT client tokens.
     * 
     * @return mixed
     */
    public function client()
    {
        $url = sprintf('%s/jwt/client', $this->route);

        Arr::set($headers, 'Accept', 'application/json');

        return $this->httpRequest->post($url, [
            'client_id' => $this->id,
            'client_secret' => $this->secret
        ], $headers);
    }
}
