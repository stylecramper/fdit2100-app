import { Suspense, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { PlusIcon } from '@heroicons/react/24/solid';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { Button } from '@/components/ui/button';
import PostsList from '@/components/ui/posts/PostsList';
import PostsSkeleton from '@/components/ui/skeletons/PostsSkeleton';
import { PostsLastPageContext } from '@/lib/contexts/PostsLastPageContext';
import styles from './latestPosts.module.css';

export default function LatestPosts() {
    const context = useContext(PostsLastPageContext);
    if (!context) {
        throw new Error('LatestPosts must be used within a PostsPageProvider');
    }
    const { page, setPage } = context;

    const navigate = useNavigate();

    return (
        <>
            <div className={styles.latest_posts_container}>
                <h2 className="text-4xl font-bold mb-6">
                    Latest Posts
                </h2>
                <Button className={styles.create_post_button} onClick={() => navigate('create-post')}>
                    <PlusIcon className="size-6" /> Create Post
                </Button>
                <Outlet />
            </div>
            <ErrorBoundary message="Failed to load posts">
                <Suspense fallback={<PostsSkeleton />}>
                    <PostsList page={page} setPage={setPage} />
                </Suspense>
            </ErrorBoundary>
        </>
    );
}