import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from "./widgets";
import { ArticlePage, HomePage } from "./pages";

export const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/articles/:id" element={<ArticlePage />} />
                </Route>
            </Routes>
        </>
    );
};
