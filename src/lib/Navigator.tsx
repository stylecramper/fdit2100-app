import { type RouteObject } from "react-router";
import App from '@/App';
import LatestPosts from "@/components/latestPosts/LatestPosts";
import Members from "@/screens/members/Members";
import PostsByMember from "@/screens/members/PostsByMember";
import Messages from "@/screens/messages/Messages";
import Notifications from "@/screens/notifications/Notifications";
import Login from '@/screens/login/Login';
import NotFound from "@/screens/notFound/NotFound";

const routes: RouteObject[] = [
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: LatestPosts
            },
            {
                path: '/members',
                Component: Members
            },
            {
                path: '/members/:id/posts',
                Component: PostsByMember
            },
            {
                path: '/messages',
                Component: Messages
            },
            {
                path: '/notifications',
                Component: Notifications
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '*',
                Component: NotFound
            }
        ]
    }
];
export default routes;