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

$router->group(['middleware' => 'user', 'prefix' => 'post'], function () use ($router) {
    $router->get('/', 'PostController@index');
    $router->post('/', 'PostController@store');
    $router->get('{id}', 'PostController@show');
    $router->put('{id}', 'PostController@update');
    $router->delete('{id}', 'PostController@destroy');
});
