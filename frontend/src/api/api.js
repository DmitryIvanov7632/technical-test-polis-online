import { useArticleStore, useCommentStore } from '../store.js'
import {
    ArticleSchema,
    ArticleListSchema,
    CommentSchema,
    CommentListSchema
} from '../schemes';


export const BASE_URL = "http://localhost:8080/api/articles";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export const getArticles = async () => {
    const store = useArticleStore.getState();
    const response = await api.get(`/`);

    const articles = response.data;
    store.setArticles(articles);

    return ArticleListSchema.parse(articles);
};

export const getArticle = async (id) => {
    const response = await api.get(`/${id}`);
    const article = response.data;

    useArticleStore.getState().addArticle(article);
    useCommentStore.getState().addComment(article.id, article.comments);
    return ArticleSchema.parse(response.data);
};

export const createArticle = async (data) => {
    const response = await api.post(`/`, data);
    const article = response.data;

    useArticleStore.getState().addArticle(article);

    return ArticleSchema.parse(article);
};

export const createComment = async (articleId, data) => {
    const response = await api.post(`/${articleId}/comments`, data);
    const comment = response.data;

    useCommentStore.getState().addComment(articleId, comment);
    return CommentSchema.parse(comment);
};

export const getComments = async (articleId) => {
    const response = await api.get(`/${articleId}/comments`);
    const comments = response.data;

    useCommentStore.getState().setCommentsByArticle(articleId, comments);
    return CommentListSchema.parse(comments);
}