import { Skeleton } from '@/components/ui/skeleton'

export default function MembersSkeleton() {
    return (
        <>
            <div className="max-w-4xl mx-auto mt-8 space-y-4">
                <div className="flex justify-between space-x-4">
                    <div className="w-[70%] space-x-4">
                        <Skeleton className="mb-2 h-5 w-[120px] rounded-full" />
                        <Skeleton className="mb-2 h-4 w-sm rounded-full" />
                        <div className="flex mt-4 space-y-2">
                            <Skeleton className="h-10 w-[20%] mr-4 rounded-lg" />
                        </div>
                    </div>
                    <Skeleton className="w-3xs h-[140px] rounded-lg" />
                </div>
                <div className="flex justify-between space-x-4">
                    <div className="w-[70%] space-x-4">
                        <Skeleton className="mb-2 h-5 w-[120px] rounded-full" />
                        <Skeleton className="mb-2 h-4 w-sm rounded-full" />
                        <div className="flex mt-4 space-y-2">
                            <Skeleton className="h-10 w-[20%] mr-4 rounded-lg" />
                        </div>
                    </div>
                    <Skeleton className="w-3xs h-[140px] rounded-lg" />
                </div>
            </div>
        </>
    );
}
