"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAddressByCep } from "@/lib/viacep";
import { PasswordRules } from "@/components/passwordRules";

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

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-medium">Endereço de Entrega</label>
                        {loadingCep && <span className="text-xs text-blue-600 animate-pulse">Buscando CEP... </span>}
                    </div>
                    <input 
                        name="zipCode" 
                        placeholder="CEP"
                        onBlur={handleCepBlur}
                        maxLength={8}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <div className="grid grid-cols-4 gap-2">
                        <input 
                            name="street"
                            placeholder="Rua"
                            value={address.street || ""} 
                            onChange={(e) => setAddress({...address, street: e.target.value})}
                            className="col-span-3 border p-2 rounded bg-gray-50"
                            required
                        />
                    <input name="number" placeholder="Nº" className="col-span-1 border p-2 rounded" required/>
                    </div>


                    <div className="grid grid-cols-3 gap-2">
                        <input 
                            name="district"
                            placeholder="Bairro"
                            value={address.district || ""}
                            onChange={(e) => setAddress({...address, district: e.target.value})}
                            className="border p-2 rounded bg-gray-50" 
                            required
                        />

                        <input
                            name="city"
                            placeholder="Cidade"
                            value={address.city || ""}
                            onChange={(e) => setAddress({...address, city: e.target.value})}
                            className="border p-2 rounded bg-gray-50"
                            required
                        />
                        <input 
                            name="complement" 
                            placeholder="Complemento (Opcional)" 
                            className="w-full border p-2 rounded" 
                        />
                    </div>
                    <input
                        name="state"
                        placeholder="UF"
                        value={address.state || ""}
                        onChange={(e) => setAddress({...address, state: e.target.value})}
                        className="w-full border p-2 rounded bg-gray-50"
                        maxLength={2}
                        required
                    />
                </div>

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