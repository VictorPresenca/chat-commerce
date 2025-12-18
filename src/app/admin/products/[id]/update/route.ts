import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;
  
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));

  await prisma.product.update({
    where: { id: id },
    data: {
      name,
      slug,
      description,
      price,
      stock,
    },
  });

  return NextResponse.redirect(
    new URL("/admin/products", req.url),
    303
  );
}