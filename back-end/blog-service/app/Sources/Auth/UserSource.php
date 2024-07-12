<?php

namespace App\Sources\Auth;

use Illuminate\Support\Arr;

use App\Sources\Auth\Contracts\TokenSourceInterface;
use App\Sources\Source;
use App\Sources\Auth\Contracts\UserSourceInterface;
use App\Sources\Support\BaseContracts\HttpRequestInterface as HttpRequest;

class UserSource extends Source implements UserSourceInterface
{
    /**
     * @var \App\Sources\Support\BaseContracts\HttpRequestInterface
     */
    protected $httpRequest;

    /**
     * @var \App\Sources\Auth\Contracts\TokenSourceInterface
     */
    protected $tokenSource;

    /**
     * Create the source instance and declare the route endpoint.
     * 
     * @param App\Sources\Support\BaseContracts\HttpRequestInterface
     * @param App\Sources\Auth\Contracts\TokenSourceInterface
     */
    public function __construct(
        HttpRequest $httpRequest,
        TokenSourceInterface $tokenSource
    ) {
        $this->httpRequest = $httpRequest;
        $this->tokenSource = $tokenSource;

        $this->route = env('AUTH_SERVICE_URL');
        $this->id = env('JWT_CLIENT_ID');
        $this->secret = env('JWT_CLIENT_secret');
    }

    /**
     * Get user data.
     * 
     * @param $id
     * @return mixed
     */
    public function getUser($id)
    {
        $url = sprintf('%s/user/%d', $this->route, $id);
        $token = $this->tokenSource->client();

        Arr::set($headers, 'Accept', 'application/json');
        Arr::set($headers, 'Authorization', 'Bearer ' . $token->access_token);

        return $this->httpRequest->get($url, [], $headers);
    }
}
