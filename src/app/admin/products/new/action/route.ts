import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      stock,
    },
  });

  return NextResponse.redirect(
    new URL("/admin/products", req.url)
  );
}