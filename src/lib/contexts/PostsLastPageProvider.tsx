import React, { useState } from 'react';
import { PostsLastPageContext } from '@/lib/contexts/PostsLastPageContext';

export function PostsLastPageProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(0);

    const context = {
        page,
        setPage,
    };

    return (
        <PostsLastPageContext.Provider value={context}>
            {children}
        </PostsLastPageContext.Provider>
    );
}