<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreCommentRequest;

class CommentController extends Controller
{
    public function index($id)
    {
        $article = Article::findOrFail($id);

        $comments = $article->comments()->get();

        return response()->json($comments, 200);

    }


    public function store(StoreCommentRequest $request, int $id): JsonResponse
    {
        $article = Article::findOrFail($id);

        $comment = $article->comments()->create($request->validated());

        $comment->refresh();

        return response()->json($comment, 201);
    }
}
