import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const formData = await req.formData();

    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    if (!name || !email || !password) {
        return NextResponse.json(
            { error: "Dados inválidos" },
            { status: 400 }
        );
    }

    const userExists = await prisma.user.findUnique({
        where: { email },
    });

    if(userExists) {
        return NextResponse.json(
            { error: "Usuário já existe" },
            { status: 409 },
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    return NextResponse.json({ success: true });
}