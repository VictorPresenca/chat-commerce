"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";
import { getCartProducts } from "./actions";

type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export default function CartPage() {
  const items = useCart(state => state.items);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);

  useEffect(() => {
    async function loadCart() {
      setLoading(true);
      const data = await getCartProducts(
        items.map(item => ({
            id: item.productId,
            quantity: item.quantity,
        }))
      );
      setProducts(data);
      setLoading(false);
    }

    loadCart();
  }, [items]);

  const total = products.reduce((acc, p) => acc + p.subtotal, 0);

  if (loading) return <p className="max-w-4xl mx-auto p-6 text-2xl font-bold mb-6">Carregando carrinho...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Carrinho</h1>

      {products.length === 0 ? (
        <p>
            Seu carrinho está vazio.
        </p>
      ) : (
        <>
          <ul className="space-y-6">
            {products.map(product => (
              <li
                key={product.id}
                className="flex justify-between border p-4 rounded"
                >
                <div>
                    <p className="font-medium">{product.name}</p>

                    <p className="text-sm text-gray-500 mt-1">
                    R$ {product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border rounded">
                        <button
                        onClick={() =>
                            updateQuantity(product.id, product.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                        >
                        −
                        </button>

                        <span className="px-4 select-none">
                        {product.quantity}
                        </span>

                        <button
                        onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                        >
                        +
                        </button>
                    </div>

                    <button
                        onClick={() => removeItem(product.id)}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Excluir
                    </button>
                    </div>
                </div>
                <p className="font-semibold">
                    R$ {product.subtotal.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-bold">
              Total: R$ {total.toFixed(2)}
            </p>

            <button className="px-6 py-3 bg-black text-white rounded">
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </main>
  );
}
