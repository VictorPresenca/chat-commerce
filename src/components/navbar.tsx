"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/lib/store";
import { ShoppingCart } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const totalItems = useCart((state) => 
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="border-b">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          F. Frio
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/store/cart" className="relative"
          >
            <ShoppingCart size={24} strokeWidth={1.5} className="text-black" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </Link>

          {!session ? (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Entrar
              </Link>

              <Link
                href="/auth/register"
                className="px-4 py-2 bg-black text-white rounded hover:opacity-90"
              >
                Cadastrar
              </Link>
            </div>
            
            
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Conta ▾
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 border bg-white rounded shadow">
                  <Link 
                    href="/account" 
                    onClick={() => setOpen(false)} 
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Minha conta
                  </Link>
                  
                  {isAdmin && (
                    <Link
                      href="/admin/products"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100 text-blue-600"
                    >
                      Painel Admin
                    </Link>
                  )}

                  <button onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
