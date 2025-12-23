import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AppPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/app/store/products/${product.slug}`}
          className="border rounded p-4 hover:shadow"
        >
          <h2 className="font-bold">{product.name}</h2>
          <p className="text-sm text-gray-500">
            R$ {(Number(product.price) / 100).toFixed(2)}
          </p>
        </Link>
      ))}
    </main>
  );
}
