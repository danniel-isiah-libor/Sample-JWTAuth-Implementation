<?php

namespace App\Sources\Support\BaseContracts;

interface SourceInterface
{
    /**
     * Get the route for the API endpoint.
     * 
     * @return string
     */
    public function route();

    /**
     * Get the client ID.
     * 
     * @return string
     */
    public function id();

    /**
     * Get the client secret.
     * 
     * @return string
     */
    public function secret();
}
