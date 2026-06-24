import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ShieldCheck, Star, CalendarDays, ThumbsUp, MessageSquare, ArrowLeft, Leaf, Truck } from "lucide-react";
import { useStore } from "@/lib/store";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/produtor/fazenda-boa-terra")({
  component: ProdutorPerfilPage,
});

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1595859703065-cc958019e07b?w=800&q=80";

function ProdutorPerfilPage() {
  const { produtos } = useStore();
  const [produtosLocal, setProdutosLocal] = useState(produtos);

  // 🔥 Sincroniza sempre que o store mudar
  useEffect(() => {
    setProdutosLocal(produtos);
  }, [produtos]);

  // 🔥 Recarrega do localStorage se necessário
  useEffect(() => {
    const saved = localStorage.getItem('@mr/produtos.v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProdutosLocal(parsed);
      } catch {}
    }
  }, []);

  // Se não houver produtos, mostra loading
  if (!produtosLocal || produtosLocal.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">Carregando produtos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ... resto do conteúdo (igual ao que você já tem) ... */}
      {/* A parte importante é a seção de produtos */}
      <section id="produtos" className="pt-4">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Produtos Disponíveis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {produtosLocal.map((p) => (
            <Link
              key={p.id}
              to="/catalogo/$id"
              params={{ id: p.id }}
              className="group flex gap-4 bg-card rounded-2xl p-4 border border-border hover:border-primary/50 transition-all hover:shadow-md"
            >
              <div className="size-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                <img
                  src={p.imagem || p.image || FALLBACK_IMG}
                  alt={p.nome}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{p.nome}</h3>
                <div className="text-xs text-muted-foreground uppercase tracking-wider my-1">{p.categoria}</div>
                <div className="font-display font-bold text-primary text-lg">
                  {formatBRL(p.preco)} <span className="text-sm text-muted-foreground font-normal">/ {p.unidade}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/catalogo" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-border text-foreground font-bold hover:bg-muted transition-colors">
            Explorar catálogo completo da Terra Viva
          </Link>
        </div>
      </section>
      {/* ... resto do conteúdo ... */}
    </div>
  );
}
