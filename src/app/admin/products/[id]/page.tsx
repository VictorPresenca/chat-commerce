import { prisma } from "@/lib/prisma";

interface Props {
    params: {id: string };
}

export default async function EditProductPage ({ params }: Props){
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product){
        return <p className="p-8">Produto não encontrado</p>;
    }

    return (
        <main className="p-8 max-w-xl">
            <h1 className="text-2xl font-bold mb-6">
                Editar produto
            </h1>

            <form action="">
                <input  
                    name="name"
                    defaultValue={product.name}
                    className="w-full border p-2"
                    required
                />
                <input  
                    name="slug"
                    defaultValue={product.slug}
                    className="w-full border p-2"
                    required
                />
                <textarea
                    name="description"
                    defaultValue={product.description}
                    className="w-full border p-2"
                    required
                />
                <input  
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={Number(product.price)}
                    className="w-full border p-2"
                    required
                />
                <input  
                    name="stock"
                    type="number"
                    defaultValue={product.stock}
                    className="w-full border p-2"
                    required
                />
                <button className="bg-black text-white px-4 py-2 rounded">
                    Salvar alterações
                </button>
            </form>
        </main>
    );
}