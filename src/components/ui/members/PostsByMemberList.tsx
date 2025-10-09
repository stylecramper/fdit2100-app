import { useNavigate } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from '@/components/ui/button';
import Post from "@/components/ui/posts/Post";
import { fetchPostsByMember } from "@/lib/api";
import styles from '@/components/ui/members/member.module.css';

interface Props {
    id: number;
}

export default function PostsByMemberList(props: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ['memberposts'],
        queryFn: () => fetchPostsByMember(props.id),
    });
    const navigate = useNavigate();

    return (
        <>
        {data.posts.length === 0 ? (
            <>
            <h3 className="mb-4">This member hasn't created any posts.</h3>
            <Button className={styles.viewPostsButton} onClick={() => navigate(-1)}>
                <ArrowLeftIcon /> Back
            </Button>
            </>
        ) : (
            <>
            <ul className="mt-3">
                {data.posts.map((post, postIndex) => (
                    <Post key={post.id} post={post} isLast={ postIndex === data.posts.length - 1} />
                ))}
            </ul>
            <Button className={styles.viewPostsButton} onClick={() => navigate(-1)}>
                <ArrowLeftIcon /> Back
            </Button>
            </>
        )}
        </>
    );
}