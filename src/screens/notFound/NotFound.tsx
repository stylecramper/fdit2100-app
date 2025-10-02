import { NavLink } from "react-router";
import styles from '@/screens/notFound/notFound.module.css';

export default function NotFound() {
    return (
        <div className="flex justify-center items-center flex-col text-center mt-20">
            <img className={styles.shrugOnLight} src="/photos/shrug.png" alt="404 Not Found" />
            <img className={styles.shrugOnDark} src="/photos/shrug_dark.png" alt="404 Not Found" />
            <h2 className="text-4xl font-bold">Whoops it's a 404!</h2>
            <p className="mb-4">The page you're looking for doesn't exist.</p>
            <NavLink to="/" className="text-sky-500 font-bold hover:underline">
                Want to return home?
            </NavLink>
        </div>
    );
}