"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        await fetch("/api/auth/register", {
            method: "POST",
            body: formData,
        });

        setLoading(false);
    }

    return (
        <main className="p-6 max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Nome" className="w-full border p-2" required />
                <input name="email" type="email" placeholder="Email" className="w-full border p-2" required />
                <input name="password" type="password" placeholder="Senha" className="w-full border p-2" required />

                <button disabled={loading} className="w-full bg-black text-white py-2 rounded">
                    {loading ? "Criando conta..." : "Cadastrar"}
                </button>
            </form>
        </main>
    );
}