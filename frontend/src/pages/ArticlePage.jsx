import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Error, Loader } from "../shared";
import { useArticleStore } from "../store.js";
import { getArticle } from "../api";
import { CommentsList, CommentForm } from "../widgets";

export const ArticlePage = () => {
    const articleId = Number(useParams().id);
    const article = useArticleStore.getState().articles.find(a => a.id === articleId);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(!article);

    useEffect(() => {
        const fetchArticle = async () => {
            if (article) return;
            try {
                await getArticle(articleId);
                setLoading(false);
            } catch (err) {
                setError(true);
            }
        };
        fetchArticle();
    }, [articleId, article]);

    if (error) return <Error message="Ошибка при загрузке статьи" />;
    if (loading) return <Loader />;
    if (!article) return <Error message="Такой статьи не существует" />;

    return (
        <div className="article-page">
            <h1 className="article-page_title">{article.title}</h1>
            <p className="date">{article.created_at}</p>
            <p className="descr">{article.content}</p>

            <div className="comments-section">
                <CommentsList />
                <CommentForm />
            </div>
        </div>
    );
};
