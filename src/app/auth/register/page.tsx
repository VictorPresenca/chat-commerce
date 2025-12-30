"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAddressByCep } from "@/lib/viacep";
import { PasswordRules } from "@/components/passwordRules";
import { AddressFields } from "@/components/address/addressForm";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);
    const router = useRouter();
    const [password, setPassword] = useState("");

    const [address, setAddress] = useState({
        street: "",
        district: "",
        city: "",
        state: "",
    });

    async function handleCepBlur(e: React.FocusEvent<HTMLInputElement>) {
        const cep = e.target.value.replace(/\D/g, "");
        if (cep.length === 8) {
            setLoadingCep(true);
            const data = await getAddressByCep(cep);
            
            if (!data) {
                alert("CEP Inválido ou não encontrado!");
                setAddress({
                    street: "",
                    district: "",
                    city: "",
                    state: "",
                });
            } else {
                setAddress({
                    street: data.street,
                    district: data.district,
                    city: data.city,
                    state: data.state,
                });
            }
            setLoadingCep(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            router.push("/login")
        } else {
            alert("Erro ao cadastrar, tente novamente");
            setLoading(false);
        }

        setLoading(false);
    }

    return (
        <main className="p-6 max-w-xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">Criar conta</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <input 
                        name="name" 
                        placeholder="Nome" 
                        className="w-full border p-2 rounded" 
                        required 
                    />
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        className="w-full border p-2 rounded" 
                        required 
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Senha" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded" 
                        required 
                    />
                    <PasswordRules password={password} />
                </div>

                <hr />

                <AddressFields isEmbedded />

                <button 
                    disabled={loading || loadingCep} 
                    className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 disabled:bg-gray-400 transition-colors cursor-pointer"
                >
                    {loading ? "Criando conta..." : "Cadastrar"}
                </button>
            </form>
        </main>
    );
}