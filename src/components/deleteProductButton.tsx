"use client";

import { deleteProduct } from "@/app/admin/products/actions/actions";

export default function DeleteProductButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteProduct(id);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="text-red-600 hover:underline"
    >
      Excluir
    </button>
  );
}