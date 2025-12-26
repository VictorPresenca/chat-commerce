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
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Nome" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Senha" required />

            <button disabled={loading}>
                {loading ? "Criando conta..." : "Cadastrar"}
            </button>
        </form>
    );
}