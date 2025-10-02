import { useEffect, useRef } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { fetchPosts } from '@/lib/api';
import { type PostsLastPageState } from '@/lib/types/post';
import Post from '@/components/ui/posts/Post';
import styles from '@/components/ui/posts/postsList.module.css';

export default function PostsList({ page, setPage }: PostsLastPageState) {
    const postListRef = useRef(null);
    useEffect(() => {
        if (postListRef.current) {
            const observer = new MutationObserver(() => {
                window.scrollBy({
                    left: 0,
                    top: window.innerHeight - 180,
                    behavior: 'smooth',
                });
            });
            observer.observe(postListRef.current, {
                childList: true,
            });
            return () => observer.disconnect();
        }
    }, []);

    const {
        data,
        fetchNextPage,
        hasNextPage,
    }  = useSuspenseInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => fetchPosts(pageParam),
        initialPageParam: 0,
        getNextPageParam: (mostRecentPage) => {
            return mostRecentPage.skip + mostRecentPage.limit < mostRecentPage.total ? page + 1 : undefined;
        },
        staleTime: 1000 * 60, // 1 minute
    });

    return (
        <>
            <ul ref={postListRef}>
                {data.pages.map((page, pageIndex) => {
                    return page.posts.map((post, postIndex) => (
                        <Post key={post.id} post={post} isLast={pageIndex === data.pages.length -1 && postIndex === page.posts.length - 1} />
                    ));
                })}
            </ul>
            {hasNextPage && <div className="flex justify-end">
                <Button variant="link" className={styles.loadMoreButton} onClick={() => {
                    setPage(page => page + 1);
                    fetchNextPage();
                }}>Load More <ArrowRightIcon /></Button>
                </div>
            }
        </>
    );
}