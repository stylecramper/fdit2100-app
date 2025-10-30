import { useCallback, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from "react-router";
import { useQueryClient } from '@tanstack/react-query';
import { z } from "zod";
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import TagChip from '@/components/createPost/TagChip';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/lib/api';
import { useAppStore } from '@/lib/appStore';
import { CREATE_POST_AUTH_NOTICE } from '@/lib/constants';
import type { Post, PostsCacheState } from '@/lib/types/post';
import styles from '@/components/latestPosts/latestPosts.module.css';

const allTags = [
    "american",
    "classic",
    "crime",
    "english",
    "fiction",
    "french",
    "history",
    "love",
    "magical",
    "mystery"
];

const postSchema = z.object({
    title: z
    .string()
    .min(1, 'Title is required, at least 1 character long.'),
    body: z
    .string()
    .min(1, 'Body is required, at least 1 character long.'),
});

export default function CreatePost() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [availableTags, setAvailableTags] = useState<string[]>(allTags);

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            body: '',
        },
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isAuthenticated, user } = useAppStore();

    if (!isAuthenticated) {
        toast.error(CREATE_POST_AUTH_NOTICE, { position: 'top-right' });
    }

    const addTag = useCallback((tag: string) => {
        if (tag && !selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
            setAvailableTags(availableTags.filter((availableTag) => tag !== availableTag));
        }
    }, [availableTags, selectedTags]);

    const removeTag = useCallback((tag: string) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
        setAvailableTags([...availableTags, tag]);
    }, [availableTags, selectedTags]);

    const addPost = useCallback(async () => {
        const newPost: Post = await createPost(
            user!.id,
            user!.accessToken,
            form.getValues('title'),
            form.getValues('body'),
            selectedTags
        );
        newPost.reactions = {
            likes: 0,
            dislikes: 0
        };
        newPost.views = 0;
        queryClient.setQueryData(['posts'], (oldData: PostsCacheState) => {
            oldData.pages[0].posts.unshift(newPost);
            return oldData;
        });
        navigate('/');
    }, [form, navigate, queryClient, selectedTags, user]);

    return isAuthenticated && (<Dialog defaultOpen onOpenChange={(open) => {
        if (!open) {
            navigate(-1);
        }
    }}>
        <DialogContent className={styles.dialog}>
            <DialogDescription className="sr-only">Create New Post form</DialogDescription>
            <DialogHeader>
                <DialogTitle className={styles.dialogTitle}>
                    Create Post
                </DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => {
                    console.log(data);
                })}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="mb-8">
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem className="mb-8">
                                <FormControl>
                                    <Textarea placeholder="What's on your mind?" className={styles.body} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="border border-gray-300 mb-2 px-4 pt-2 pb-3 rounded-md">
                        {selectedTags.length === 0 ? (
                            <span className="text-gray-400 cursor-default">Tags appear here</span>
                        ) : (
                            selectedTags.map((tag) => {
                                return <TagChip key={tag} tag={tag} onDelete={removeTag} />;
                            })
                        )}
                    </div>
                    <Select onValueChange={(value) => addTag(value)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select some tags">
                                Select some tags
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tags</SelectLabel>
                                {availableTags.map((tag) => (
                                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </form>
            </Form>
            <DialogFooter>
                <Button className={styles.create_post_button} onClick={addPost}>Post</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>)
}