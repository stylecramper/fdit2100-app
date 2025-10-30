import { useCallback } from "react";
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppStore } from "@/lib/appStore";
import styles from './login.module.css';

const loginSchema = z.object({
    username: z.string().min(4, 'Username is required, at least 4 characters'),
    password: z.string().min(8, 'Password is required, at least 8 characters')
});

export default function Login() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const navigate = useNavigate();
    const { error, login } = useAppStore();

    const onLogin = useCallback(async (values: z.infer<typeof loginSchema>) => {
        const loginResult = await login(values);
        if (loginResult?.accessToken) {
            navigate(-1);
            return null;
        }
    }, [login, navigate]);

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold my-6">Welcome Back</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onLogin)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={(({ field }) => (
                            <FormItem className="mb-4">
                                <FormControl>
                                    <Input placeholder="Username" className={styles.input} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ))}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={(({ field }) => (
                            <FormItem className="mb-4">
                                <FormControl>
                                    <Input type="password" placeholder="Password" className={styles.input} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ))}
                    />
                    <Button type="submit" className={styles.loginButton}>
                        Sign In
                    </Button>
                    {error && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                            <ExclamationTriangleIcon className="size-5 mr-2" />
                            <span>{error}</span>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
}