<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Sources\Auth\Contracts\UserSourceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    protected $userSource;

    public function __construct(UserSourceInterface $userSource)
    {
        $this->userSource = $userSource;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = Post::paginate($request->page ?? 1);

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = Post::create($request->all());

        return response()->json($data, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int|string  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Post::find($id);

        $user = $this->userSource->getUser($id);

        Arr::set($data, 'user', $user);

        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int|string  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::user()->id) abort(401, 'Unauthorized');

        $post->update($request->all());

        return response()->json($post, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int|string $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::user()->id) abort(401, 'Unauthorized');

        return response()->json($post->delete(), 200);
    }
}
