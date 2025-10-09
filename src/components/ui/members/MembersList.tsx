import { useSuspenseQuery } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from '@/components/ui/input';
import Member from './Member';
import { fetchMembers } from "@/lib/api";
import styles from  './membersList.module.css';

export default function MembersList() {
    const { data } = useSuspenseQuery({
        queryKey: ['members'],
        queryFn: () => fetchMembers(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <>
            <Input name="search-members" placeholder="Search members" className={styles.searchField} />
            <MagnifyingGlassIcon className="size-5 -translate-y-8 translate-3 text-gray-400" />
            <ul className="mt-3">
                {data.users.map(user => (
                    <Member key={user.id} member={user} />
                ))}
            </ul>
        </>
    );
}