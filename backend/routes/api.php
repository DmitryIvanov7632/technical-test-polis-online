<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;

Route::middleware('api')->group(function () {

    Route::apiResource('articles', ArticleController::class)->parameters([
        'articles' => 'id'
    ]);

    Route::post('articles/{id}/comments', [CommentController::class, 'store']);
    Route::get('articles/{id}/comments', [CommentController::class, 'index']);

});
