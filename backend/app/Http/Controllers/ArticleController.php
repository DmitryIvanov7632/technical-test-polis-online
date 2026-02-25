<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreArticleRequest;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $articles = Article::all();

        return response()->json($articles, 200);
    }

    public function store(StoreArticleRequest $request): JsonResponse
    {
        $article = Article::create($request->validated());

        $article->refresh();

        return response()->json($article, 201);
    }

    public function show(int $id): JsonResponse
    {
        $article = Article::with('comments')->findOrFail($id);

        return response()->json($article, 201);
    }
}
