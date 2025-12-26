"use server";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/guards/requireAdmin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getProductData(formData: FormData) {
  return {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
  };
}

// ACTION: CRIAR PRODUTO
export async function createProduct(formData: FormData) {
  await requireAdmin();

  const data = getProductData(formData);

  await prisma.product.create({
    data,
  });

  revalidatePath("/admin/products");
  revalidatePath("/"); // Atualiza a home caso o produto novo deva aparecer lá
  redirect("/admin/products");
}

// ACTION: ATUALIZAR PRODUTO
export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();

  const data = getProductData(formData);

  await prisma.product.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/products");
  revalidatePath(`/store/products/${data.slug}`);
  redirect("/admin/products");
}

// ACTION: DELETAR PRODUTO
export async function deleteProduct(id: string) {
  await requireAdmin();

  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao deletar produto" };
  }
}