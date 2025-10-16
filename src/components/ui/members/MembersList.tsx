import { useMemo, useState } from 'react';
import { useSuspenseQuery } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from '@/components/ui/input';
import Member from './Member';
import { fetchMembers } from "@/lib/api";
import { type Member as MemberType } from '@/lib/types/member';
import styles from  './membersList.module.css';

export default function MembersList() {
    const [nameFilter, setNameFilter] = useState('');

    /* const filterMembers = useCallback((member: MemberType) => {
        return member.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
            member.lastName.toLowerCase().includes(nameFilter.toLowerCase());
    }, [nameFilter]); */

    const { data } = useSuspenseQuery({
        queryKey: ['members'],
        queryFn: () => fetchMembers(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const filteredMembers = useMemo(() => data.users.filter((member: MemberType) => 
        member.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
            member.lastName.toLowerCase().includes(nameFilter.toLowerCase())
    ), [data.users, nameFilter]);

    return (
        <>
            <Input name="search-members" value={nameFilter} onChange={event => setNameFilter(event.target.value)} placeholder="Search members" className={styles.searchField} />
            <MagnifyingGlassIcon className="size-5 -translate-y-8 translate-3 text-gray-400" />
            <ul className="mt-3">
                {filteredMembers.length === 0 ? (
                    <li className="text-gray-500">No members found. Try a different search?</li>
                ) :
                filteredMembers.map(user => (
                    <Member key={user.id} member={user} />
                ))}
            </ul>
        </>
    );
}