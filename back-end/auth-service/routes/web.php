<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->post('login', 'AuthController@login');
$router->post('refresh-token', 'AuthController@refreshToken');

$router->post('register', 'UserController@store');

$router->group(['middleware' => 'jwt:user'], function () use ($router) {
    $router->post('logout', 'AuthController@logout');
    $router->post('verify-token', 'AuthController@verifyAccessToken');
});

$router->group(['middleware' => 'jwt:client'], function () use ($router) {
    $router->get('user/{id}', 'UserController@show');
});
