"use client";

import { Trash2 } from "lucide-react";
import { deleteAddressAction } from "@/app/account/addresses/actions";
import { useState } from "react";

export function DeleteAddressButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Tem a certeza que deseja excluir este endereço?")) return;

    setIsDeleting(true);
    try {
      await deleteAddressAction(id);
    } catch (error) {
      alert("Erro ao excluir endereço.");
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-sm font-medium text-red-500 hover:text-red-700 disabled:text-gray-400 flex items-center gap-1 transition-colors"
    >
      <Trash2 size={16} />
      {isDeleting ? "A excluir..." : "Excluir"}
    </button>
  );
}