import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from "react-router-dom";
import { CreateCommentSchema  } from "../schemes/index.js";
import { createComment } from "../api";
import { Error } from "../shared";
export const CommentForm = () => {
    const articleId = Number(useParams().id);
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {  errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(CreateCommentSchema),
        mode: "onSubmit",
    });

    const onSubmit = async (data) => {

        try {
            await createComment(articleId, data);
            setError(false);
            reset();
        } catch (err) {

            setError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
            {error.current && <Error message="При отправке комментария произошла ошибка" />}

            <div className="comment-form__group">
                <input
                    type="text"
                    placeholder="Введите имя"
                    {...register("author_name")}
                    className="comment-input"
                />
                {errors.author_name && (
                    <p className="comment-error">{errors.author_name.message}</p>
                )}
            </div>

            <div className="comment-form__group">
                <textarea
                    placeholder="Введите комментарий"
                    {...register("content")}
                    className="comment-textarea"
                />
                {errors.content && (
                    <p className="comment-error">{errors.content.message}</p>
                )}
            </div>

            <button type="submit" disabled={isSubmitting} className="comment-button">
                {isSubmitting ? "Запрос выполняется" : "Опубликовать комментарий"}
            </button>
        </form>
    );
}