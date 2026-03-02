import axios from "axios";
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
    const response = await api.get(`/`);

    const parsed = ArticleListSchema.parse(response.data);
    useArticleStore.getState().setArticles(parsed);
};

export const getArticle = async (id) => {
    const response = await api.get(`/${id}`);
    const parsed = ArticleSchema.parse(response.data);

    useArticleStore.getState().addArticle(parsed);
    useCommentStore.getState().addComment(parsed.id, parsed.comments);
};

export const createArticle = async (data) => {
    const response = await api.post(`/`, data);
    const parsed = ArticleSchema.parse(response.data);

    useArticleStore.getState().addArticle(parsed);
};

export const createComment = async (articleId, data) => {
    const response = await api.post(`/${articleId}/comments`, data);
    const parsed = CommentSchema.parse(response.data);

    useCommentStore.getState().addComment(articleId, parsed);
};

export const getComments = async (articleId) => {
    const response = await api.get(`/${articleId}/comments`);
    const parsed = CommentListSchema.parse(response.data);

    useCommentStore.getState().setCommentsByArticle(articleId, parsed);
}