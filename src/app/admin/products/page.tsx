import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import DeleteProductButton from "@/components/deleteProductButton";

export default async function AdminProductPage() {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN"){
        redirect
    }

    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc"},
    });

    return(
        <main className="p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl fond-bold">Produtos</h1>

                <a href="/admin/products/new"
                className="rouded bg-black px-4 py-2 text-white">
                    Novo produto
                </a>
            </div>

            <table className="mt-6 w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Nome</th>
                        <th className="border p-2">Preço</th>
                        <th className="border p-2">Estoque</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: Prisma.ProductGetPayload<{}>) => (
                        <tr key={product.id}>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">
                                R$ {Number(product.price).toFixed(2)}
                            </td>
                            <td className="border p-2 text-center">
                                {product.stock}
                            </td>
                            <td className="border p-2 text-center space-x-2">
                                <Link href={`/admin/products/${product.id}`} className="text-blue-600 houver:underline">
                                    Editar
                                </Link>
                            <DeleteProductButton id={product.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}