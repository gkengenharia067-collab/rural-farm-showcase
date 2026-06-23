import { useState, useEffect } from "react";
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1595859703065-cc958019e07b?w=400&q=80";

export function CartDrawer({ onOpenChange }: { onOpenChange?: (open: boolean) => void } = {}) {
  const { cart, removeFromCart, updateCartQty, checkoutCart } = useStore();
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ cliente: "", whatsapp: "", observacao: "" });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const totalItens = cart.reduce((a, c) => a + c.quantidade, 0);
  const totalValor = cart.reduce((a, c) => a + c.preco * c.quantidade, 0);

  function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    const pedido = checkoutCart({
      cliente: form.cliente,
      whatsapp: form.whatsapp,
      observacao: form.observacao,
    });
    if (pedido) {
      setSuccess(true);
    }
  }

  function reset() {
    setOpen(false);
    setCheckout(false);
    setSuccess(false);
    setForm({ cliente: "", whatsapp: "", observacao: "" });
  }

  return (
    <>
      {/* SACOLA FIXA NO TOPO (STICKY) - SEM BARRA BRANCA */}
      <div className="sticky top-[70px] z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 h-11 rounded-full bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:opacity-95 transition-all font-semibold"
            aria-label="Abrir sacola"
          >
            <div className="relative">
              <ShoppingBag className="size-5" />
              {mounted && totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full size-5 flex items-center justify-center border-2 border-primary">
                  {totalItens}
                </span>
              )}
            </div>
            <span className="text-sm whitespace-nowrap">
              Sacola{mounted ? ` (${totalItens} ${totalItens === 1 ? "item" : "itens"})` : ""}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={reset} />
          <aside className="relative w-full max-w-md bg-card h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            {/* ... resto do código ... (mantenha o que já existe) */}
          </aside>
        </div>
      )}
    </>
  );
}
