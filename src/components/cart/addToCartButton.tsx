"use client";

import { useCart } from "@/lib/store";

interface Props {
    productId: string;
}

export function AddToCartButton({ productId }: Props) {
    const addItem = useCart((state) => state.addItem);

    return (
        <button 
            onClick={() => addItem(productId)}
            className="mt-4 rounded bg-black px-4 py-2 text-white hover:opacity-90" 
        >
            Adicionar ao carrinho
        </button>
    )
}