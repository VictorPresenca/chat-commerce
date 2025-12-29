"use server"

import prisma from "@/lib/prisma";

export async function getCartProducts(
    items: { id: string; quantity: number }[]
) {
    if (!items || items.length === 0) return [];

    const ids = items.map(item => item.id);

    const products = await prisma.product.findMany({
        where: { 
            id: { in: ids },
            active: true,
        },
    });

    return products.map(product => {
        const cartItem = items.find(i => i.id === product.id)!;

        return {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: cartItem.quantity,
            subtotal: Number(product.price) * cartItem.quantity,
        };
    });
}