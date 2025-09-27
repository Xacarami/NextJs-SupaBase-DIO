import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Produto() {
  const route = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // evita redirecionar antes de saber o status
    if (!session?.user) {
      route.push("/");
    }
  }, [session, status, route]);

  const { id } = route.query;

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session?.user) {
    return null; // evita renderizar conteúdo antes do redirecionamento
  }

  return (
    <div>
      <h1>Produto {id}</h1>
    </div>
  );
}
