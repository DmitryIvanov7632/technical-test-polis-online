import React, { useState } from "react";
import { ArticleFormModal } from "./index.js";
import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <header className="layout-header">
                <Link className="layout-header__link" to={`/`}>
                    <h1 className="layout-header__title">polis.online — статьи</h1>
                </Link>
                <button onClick={openModal} className="open-modal-button">
                    Добавить статью
                </button>

                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ArticleFormModal />
                            <button
                                onClick={closeModal}
                                className="close-modal-button"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <main className="layout-main">
                <Outlet />
            </main>

            <footer className="layout-footer">
                <p>2026 Ivanov Dmitry</p>
            </footer>
        </>
    );
};





