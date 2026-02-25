import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateArticleSchema } from "../schemes/index.js";
import { createArticle } from "../api";
import { Error } from "../shared";

export const ArticleFormModal = () => {
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(CreateArticleSchema),
        mode: "onSubmit",
    });

    const onSubmit = async (data) => {
        try {
            await createArticle(data);
            setError(false);
            reset();
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="article-form-modal">
            <form onSubmit={handleSubmit(onSubmit)} className="article-form">
                {error && <Error message="При отправке статьи произошла ошибка" />}

                <div className="article-form__group">
                    <input
                        type="text"
                        placeholder="Введите заголовок статьи"
                        {...register("title")}
                        className="article-input"
                    />
                    {errors.title && (
                        <p className="article-error">{errors.title.message}</p>
                    )}
                </div>

                <div className="article-form__group">
                      <textarea
                          placeholder="Введите текст статьи"
                          {...register("content")}
                          className="article-textarea"
                      />
                    {errors.content && (
                        <p className="article-error">{errors.content.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="article-button"
                >
                    {isSubmitting ? "Запрос выполняется" : "Опубликовать статью"}
                </button>
            </form>
        </div>
    );
};