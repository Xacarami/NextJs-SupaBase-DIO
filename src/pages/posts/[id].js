import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Instruments() {
    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState(true);

    const route = useRouter();

    const { id } = route.query;

    useEffect(() => {
        if (!id) return;
        async function fetchPosts() {
            const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
            if (error) console.error(error);
            else {
                setPosts(data);
                console.log(data);
                setLoading(false);
            }
        }

        fetchPosts();
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (!posts) return <p>Post não encontrado.</p>;

    return (
        <>
            <Link href="/"><button>Voltar</button></Link> <br /><br />

            <strong>ID:</strong> {posts.id} <br />
            <strong>Título:</strong> {posts.title} <br />
            <strong>Descrição:</strong> {posts.description} <br />
            <strong>Body:</strong> {posts.body}
            <hr />
        </>
    );
}
