import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { useCommentStore } from "../store.js";
import { Error, Loader } from "../shared";
import {getComments} from "../api";

export const CommentsList = () => {
    const articleId = Number(useParams().id);
    const comments = useCommentStore((state) => state.comments[articleId])
    const [error, setError] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);


    useEffect(() => {
        const fetchComments = async () => {
            if(comments?.length) return

            try {
                await getComments(articleId);
                setHasFetched(true);
                setError(false);
            } catch (err) {
                setError(true)
            }
        }
        fetchComments()
    }, []);

    if (hasFetched && !comments?.length) return <Error message='Комментариев пока нет:(' />;
    if (error) return <Error message='Ошибка при загрузке коментариев' />;
    if (!comments?.length) return <Loader />;

    return (
        <div>
            <h3 className="comments__title">Комментарии</h3>

            {comments.flat().map((comment) => (
                <div className="comment-card" key={comment.id}>
                    <div className="comment-header">
                        <span className="comment-author">{comment.author_name}</span>
                        <span className="comment-date">{comment.created_at}</span>
                    </div>

                    <p className="comment-text">{comment.content}</p>
                </div>
            ))}
        </div>
    )
}
