import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
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
import { Textarea } from '@/components/ui/textarea';
import styles from '@/components/latestPosts/latestPosts.module.css';

const postSchema = z.object({
    title: z
    .string()
    .min(1, 'Title is required, at least 1 character long.'),
    body: z
    .string()
    .min(1, 'Body is required, at least 1 character long.'),
});

export default function CreatePost() {
    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            body: '',
        },
    });
    const navigate = useNavigate();

    return <Dialog defaultOpen onOpenChange={(open) => {
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
                </form>
            </Form>
            <DialogFooter>
                <Button className={styles.create_post_button} onClick={() => navigate(-1)}>Post</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}