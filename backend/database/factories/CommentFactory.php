<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;
    public function definition(): array
    {
        return [
            'author_name' => $this->faker->name(),
            'content' => $this->faker->sentence(12),
        ];
    }
}
