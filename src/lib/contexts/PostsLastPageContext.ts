import { createContext } from "react";
import { type PostsLastPageState } from "@/lib/types/post";

export const PostsLastPageContext = createContext<PostsLastPageState | null>(null);