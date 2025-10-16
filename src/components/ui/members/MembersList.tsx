import { useCallback, useMemo, useRef, useState } from 'react';
import { useSuspenseQuery } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Input } from '@/components/ui/input';
import Member from './Member';
import { fetchMembers } from "@/lib/api";
import { type Member as MemberType } from '@/lib/types/member';
import styles from  './membersList.module.css';

export default function MembersList() {
    const [nameFilter, setNameFilter] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

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

    const clearField = useCallback(() => {
        setNameFilter('');
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <Input name="search-members" value={nameFilter} onChange={event => setNameFilter(event.target.value)} placeholder="Search members" className={styles.searchField} ref={inputRef} />
            <MagnifyingGlassIcon className="size-5 relative -top-8 left-4 text-gray-400" />
            <XMarkIcon className={`ml-auto -translate-y-13 -translate-6 size-5 text-gray-400 cursor-pointer ${nameFilter ? 'visible' : 'invisible'}`} onClick={clearField} />
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