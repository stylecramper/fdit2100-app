import { useState } from 'react';
import { NavLink } from  'react-router';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { MegaphoneIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { type ClassnameProps } from '@/lib/types/post';
import styles from './header.module.css';
import { cn } from '@/lib/utils';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';

interface MenuItem {
    title: string;
    href: string;
}

interface MenuItemProps {
    item: MenuItem;
    clickHandler: () => void;
}

const menuItems: MenuItem[] = [
    { title: 'Connect', href: '/' },
    {
        title: 'Members',
        href: '/members'
    },
    { title: 'Notifications', href: '/notifications' },
    { title: 'Messages', href: '/messages'}
];

const MenuItem = ({ item, clickHandler }: MenuItemProps) => {
    return (
        <div className="flex items-center">
            {item.href === '/' && <MegaphoneIcon className="size-6 mr-3" />}
            <NavLink
                to={item.href}
                className={({ isActive }: ClassnameProps) => isActive ? cn(
                    `block py-2 pl-9 ${styles.navlinkActive}`,
                    item.href === '/' && 'pl-0'
                ) : cn(
                    `block py-2 pl-9 ${styles.navlink}`,
                    item.href === '/' && 'pl-0'
                )}
                onClick={clickHandler}
            >
                {item.title}
            </NavLink>
        </div>
    );
};

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="link" size="icon" className={styles.sheetButton} aria-label="Toggle menu">
                    <Bars3Icon className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className={styles.sheet}>
                <SheetTitle className="sr-only">Primary Navigation</SheetTitle>
                <SheetDescription className="sr-only">Primary Navigation</SheetDescription>
                <nav className="flex flex-col space-y-4 p-5">
                    {menuItems.map((item) => (
                        <MenuItem key={item.title} item={item} clickHandler={() => setOpen(false)} />
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}