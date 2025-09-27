import { getPosts } from "@/utils/supabase/getPosts";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const data = await getPosts();
            setPosts(data);
            setLoading(false);
            console.log(posts);
        }

        if (session) {
            fetchPosts();
        }
    }, [session, posts]);

    console.log(session);

    if (session) {
        if (loading) {
            return <p>Carregando!!!!!!!!!!!!!!</p>;
        }
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut("github")}>Sign out</button>
                <h1>Posts:</h1>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <strong>{post.title}</strong> <br />
                            <Link href={`/posts/${post.id}`}>
                                <button>Acessar</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn("github")}>Sign in</button>
        </>
    );
}
