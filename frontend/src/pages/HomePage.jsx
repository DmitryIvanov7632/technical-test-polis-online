import React, {useEffect, useState} from "react";
import { useArticleStore } from "../store.js";
import { getArticles } from "../api";
import { Error, Loader } from "../shared";
import { Link } from "react-router-dom";

export const HomePage = () => {
    const articles = useArticleStore(state => state.articles);
    const serverData = useArticleStore(state => state.serverData);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(!articles.length);

    useEffect(() => {
        const fetchArticles = async () => {
            if(articles?.length) return
            try {
                await getArticles();
                setError(false);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);


    if (error) return <Error message='Ошибка при загрузке статей' />;
    if (loading) return <Loader />;
    if (!articles.length && serverData) return <Error message='Статей пока нет:(' />;

    return (
        <div className='home'>
            <h1 className='title'>Список статей</h1>
            <ul className='articles-list'>
                {articles.map((article) => (
                    <Link className="article-link" key={article.id} to={`/articles/${article.id}`}>
                        <li className='article-card'>
                            <h2 className='title title__small'>{article.title}</h2>
                            <p className='date'>{article.created_at}</p>
                            <p className='descr'>{article.content}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};




