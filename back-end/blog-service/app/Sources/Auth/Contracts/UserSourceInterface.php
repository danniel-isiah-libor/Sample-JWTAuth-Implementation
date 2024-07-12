<?php

namespace App\Sources\Auth\Contracts;

interface UserSourceInterface
{
    /**
     * Get user data.
     * 
     * @param $id
     * @return mixed
     */
    public function getUser($id);
}
