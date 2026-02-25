import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useArticleStore = create(
    persist(
        (set, get) => ({
            articles: [],
            serverData: false,

            setArticles: (newArticles) =>
                set({ articles: newArticles, serverData: true }),

            addArticle: (article) =>
                set((state) => {
                    const { comments, ...cleanArticle } = article;

                    const exists = state.articles.some(a => a.id === cleanArticle.id);
                    if (exists) return {};

                    return {
                        articles: [...state.articles, cleanArticle]
                    };
                }),

        }),
        {
            name: 'articles',
        }
    )
);

export const useCommentStore = create(
    persist(
        (set, get) => ({
            comments: {},

            setCommentsByArticle: (articleId, commentsArray) =>
                set((state) => ({
                    comments: {
                        ...state.comments,
                        [articleId]: commentsArray || []
                    }
                })),

            addComment: (articleId, comment) =>
                set((state) => {
                    const existingComments = state.comments[articleId] || [];

                    const exists = existingComments.some(c => c.id === comment.id);
                    if (exists) return {};

                    return {
                        comments: {
                            ...state.comments,
                            [articleId]: [...existingComments, comment]
                        }
                    };
                }),

        }),
        {
            name: 'comments',
        }
    )
);