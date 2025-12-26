// src/app/admin/products/new/page.tsx
import { createProduct } from "../actions/actions"; // Importa a action

export default function NewProductPage() {
  return (
    <main className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
      <form action={createProduct} className="space-y-4">
        <input name="name" placeholder="Nome do produto" className="w-full border p-2" required />
        <input name="slug" placeholder="Slug" className="w-full border p-2" required />
        <textarea name="description" placeholder="Descrição" className="w-full border p-2" required />
        <input name="price" type="number" step="0.01" placeholder="Preço" className="w-full border p-2" required />
        <input name="stock" type="number" placeholder="Estoque" className="w-full border p-2" required />
        
        <button className="bg-black text-white px-4 py-2 rounded">
          Salvar produto
        </button>
      </form>
    </main>
  );
}