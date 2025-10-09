import { Suspense } from "react";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import MembersList from "@/components/ui/members/MembersList";
import MembersSkeleton from "@/components/ui/skeletons/MembersSkeleton";
import styles from './members.module.css';

export default function Members() {
    return (
        <>
            <div className={styles.membersHeading}>
                <h2 className="mb-6 pt-8 text-4xl font-bold">Members</h2>
            </div>
            <ErrorBoundary message="Failed to load members">
                <Suspense fallback={<MembersSkeleton />}>
                    <MembersList />
                </Suspense>
            </ErrorBoundary>
        </>
    );
}