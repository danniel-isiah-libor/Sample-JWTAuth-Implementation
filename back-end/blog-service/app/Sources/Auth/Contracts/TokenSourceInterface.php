<?php

namespace App\Sources\Auth\Contracts;

interface TokenSourceInterface
{
    /**
     * Verify token.
     *
     * @param string $token
     * @return mixed
     */
    public function verifyToken($token);

    /**
     * Get JWT client tokens.
     * 
     * @return mixed
     */
    public function client();
}
