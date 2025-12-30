import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const name = String(formData.get("name")).trim();
        const email = String(formData.get("email")).toLowerCase().trim();
        const password = String(formData.get("password"));

        const zipCode = String(formData.get("zipCode")).replace(/\D/g, "");
        const street = String(formData.get("street")).trim();
        const number = String(formData.get("number")).trim();
        const complement = String(formData.get("complement") || "").trim();
        const district = String(formData.get("district")).trim();
        const city = String(formData.get("city")).trim();
        const state = String(formData.get("state")).trim().toUpperCase();

        const passwordRules = {
            minLength: password.length >= 6,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[^A-Za-z0-9]/.test(password),
        };  

        const isPasswordValid = Object.values(passwordRules).every(Boolean);

        if (
            !name ||
            !email ||
            !password ||
            !zipCode ||
            !street ||
            !number ||
            !district ||
            !city ||
            !state
            ) {
            return NextResponse.json(
                { error: "Dados inválidos ou incompletos" },
                { status: 400 }
            );
        }

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                error:
                    "A senha deve ter no mínimo 6 caracteres e conter letra maiúscula, letra minúscula, número e caractere especial",
                },
                { status: 400 }
            );
        }

        if (!/^\d{8}$/.test(zipCode)) {
        return NextResponse.json(
            { error: "CEP inválido" },
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