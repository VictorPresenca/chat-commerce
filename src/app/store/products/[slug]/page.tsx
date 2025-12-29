import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/addToCartButton";

export default async function SlugProducts({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
        where: { slug: slug },
    });

    if (!product) return notFound();

    return(
        <main className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="mt-4 text-xl font-semibold">
                R$ {(Number(product.price) / 100).toFixed(2)}
            </p>

            <AddToCartButton productId={product.id} />
        </main>
    );
}