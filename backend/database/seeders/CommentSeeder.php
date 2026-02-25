<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $articles = Article::all();

        foreach ($articles as $article) {
            Comment::factory()->count(4)->create([
                'article_id' => $article->id
            ]);
        }
    }
}
