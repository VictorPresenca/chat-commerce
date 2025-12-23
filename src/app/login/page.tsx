"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
    return (
        <main className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Login</h1>

            <form action="" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;

                await signIn("credentials", {
                    email: form.email.value,
                    password: form.password.value,
                    callbackUrl: "/admin/products",
                    }).then((res) => {
                    console.log("SIGNIN RESULT:", res);
                });
            }}
                className="space-y-4"
            >
                <input 
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2"
                    required 
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    className="w-full border p-2"
                    required 
                />

                <button className="w-full bg-black text-white py-2 rounded">
                    Entrar
                </button>
            </form>
        </main>
    )
}