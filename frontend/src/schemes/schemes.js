import { z } from "zod";

export const CreateCommentSchema = z.object({
    author_name: z
        .string()
        .nonempty({ message: "Пожалуйста, введите имя автора" })
        .max(50, { message: "Имя автора не может быть длиннее 50 символов" })
        .transform((s) => s.trim()),
    content: z
        .string()
        .nonempty({ message: "Пожалуйста, введите комментарий" })
        .max(250, { message: "Комментарий не может быть длиннее 250 символов" })
        .transform((s) => s.trim()),
});

export const CreateArticleSchema = z.object({
    title: z
        .string()
        .nonempty({ message: "Пожалуйста, введите заголовок статьи" })
        .max(95, { message: "Заголовок не может быть длиннее 95 символов" })
        .transform((s) => s.trim()),
    content: z
        .string()
        .nonempty({ message: "Пожалуйста, введите текст статьи" })
        .transform((s) => s.trim()),
});

export const CommentSchema = CreateCommentSchema.extend({
    id: z.number(),
    article_id: z.number(),
    created_at: z.string(),
});

export const CommentListSchema = z.array(CommentSchema);

export const ArticleSchema = CreateArticleSchema.extend({
    id: z.number(),
    created_at: z.string(),
    comments: CommentListSchema.optional().default([]),
});

export const ArticleListSchema = z.array(ArticleSchema);