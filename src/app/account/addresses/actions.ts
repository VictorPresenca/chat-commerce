"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function saveAddressAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Não autorizado");

  const data = {
    userId: session.user.id,
    zipCode: String(formData.get("zipCode")),
    street: String(formData.get("street")),
    number: String(formData.get("number")),
    complement: String(formData.get("complement")),
    district: String(formData.get("district")),
    city: String(formData.get("city")),
    state: String(formData.get("state")),
  };

  await prisma.address.create({ data });

  revalidatePath("/account/addresses");
  return { success: true };
}

export async function deleteAddressAction(addressId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Não autorizado");

  await prisma.address.delete({
    where: {
      id: addressId,
      userId: session.user.id,
    },
  });

  revalidatePath("/account/addresses");
}