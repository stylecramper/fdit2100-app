import React from 'react';

export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    }
    views: number;
    userId: number;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}

export interface ClassnameProps {
    isActive: boolean;
    isPending: boolean;
    isTransitioning: boolean;
}

export interface PostsLastPageState {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}
