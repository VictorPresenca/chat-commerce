import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const name = String(formData.get("name"));
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        const zipCode = String(formData.get("zipCode"));
        const street = String(formData.get("street"));
        const number = String(formData.get("number"));
        const complement = formData.get("complement") || "";
        const district = String(formData.get("district"));
        const city = String(formData.get("city"));
        const state = String(formData.get("state"));

        if (!name || !email || !password || !zipCode || !street || !number) {
            return NextResponse.json(
                { error: "Dados inválidos ou incompletos" },
                { status: 400 }
            );
        }

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return NextResponse.json(
                { error: "Usuário já existe" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            await (tx as any).address.create({
                data: {
                    userId: user.id,
                    zipCode,
                    street,
                    number,
                    complement,
                    district,
                    city,
                    state,
                },
            });
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Erro no registro:", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}