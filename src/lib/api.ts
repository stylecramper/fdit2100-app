import axios from 'axios';
import { type PostsResponse } from './types/post';
import {
    type AuthResponse,
    type LoginCredentials,
    type MembersResponse
} from './types/member';
import { API_BASE_URL, POSTS_PER_PAGE } from '@/lib/constants';

export function fetchPosts(page: number) {
    return axios.get<PostsResponse>(`${API_BASE_URL}/posts?limit=${POSTS_PER_PAGE}&skip=${page * POSTS_PER_PAGE}`)
    .then(response => response.data);
}

export function fetchMembers(): Promise<MembersResponse> {
    return axios.get(`${API_BASE_URL}/users`)
        .then(response => response.data);
}

export function fetchPostsByMember(memberId: number): Promise<PostsResponse> {
    return axios.get(`${API_BASE_URL}/posts/user/${memberId}`)
        .then(response => response.data);
}

export function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
    return axios.post(`${API_BASE_URL}/auth/login`, {
        username: credentials.username,
        password: credentials.password
    })
        .then(response => response.data)
        .catch(error => {
            return Promise.reject(error);
        });
}

export function createPost(userId: number, token: string, title: string, body: string, tags: string[]): Promise<Post> {
    return axios.post(`${API_BASE_URL}/posts/add`, {
        userId,
        title,
        body,
        tags,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
)
    .then(response => response.data);
}