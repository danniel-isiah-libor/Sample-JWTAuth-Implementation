<?php

namespace App\Sources;

use App\Sources\Support\BaseContracts\SourceInterface;

abstract class Source implements SourceInterface
{
    /**
     * The route for the API.
     * 
     * @var string
     */
    protected $route;

    /**
     * The client ID.
     * 
     * @var int
     */
    protected $id;

    /**
     * The client secret.
     * 
     * @var string
     */
    protected $secret;

    /**
     * Create the class instance and inject its dependency.
     * 
     * @param String $route
     */
    public function __construct(string $route)
    {
        $this->route = $route;
    }

    /**
     * Get the route for the API endpoint.
     * 
     * @return string
     */
    public function route()
    {
        return $this->route;
    }

    /**
     * Get the client ID.
     * 
     * @return string
     */
    public function id()
    {
        return $this->id;
    }

    /**
     * Get the client secret.
     * 
     * @return string
     */
    public function secret()
    {
        return $this->secret;
    }
}
