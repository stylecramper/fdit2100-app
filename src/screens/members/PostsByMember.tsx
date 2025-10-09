import { Suspense } from "react";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import PostsByMemberList from "@/components/ui/members/PostsByMemberList";
import PostsSkeleton from "@/components/ui/skeletons/PostsSkeleton";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import { type MembersResponse } from "@/lib/types/member";
import styles from './members.module.css';

export default function PostsByMember() {
    const { id } = useParams<{id: string}>();
    const numericId = parseInt(id || '0', 10); // number value or NaN
    const idError = numericId === 0 || isNaN(numericId);

    const queryClient = useQueryClient();
    const memberData = queryClient.getQueryData<MembersResponse>(['members']);

    const thisMember = memberData?.users.find(user => numericId === user.id);
    const firstName = thisMember?.firstName || 'Unkown';
    const lastName = thisMember?.lastName || 'User';

    return (
        <>
        {idError ? (
            <div className="mt-8 text-red-500">Error: did not receive a valid user ID</div>
        ) : (
            <>
            <div className={styles.membersHeading}>
                <h2 className="text-4xl font-bold mb-6">{`Posts by ${firstName} ${lastName}`}</h2>
            </div>
            <ErrorBoundary message="Failed to load posts">
                <Suspense fallback={<PostsSkeleton />}>
                    <PostsByMemberList id={numericId} />
                </Suspense>
            </ErrorBoundary>
            </>
        )}
        </>
    );
}