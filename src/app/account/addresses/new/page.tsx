import { AddressFields } from "@/components/address/addressForm";
import { saveAddressAction } from "../actions"; // Importe a ação que salva no banco
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewAddressPage() {
    
    async function handleAction(formData: FormData) {
        "use server";
        
        try {
            await saveAddressAction(formData);
        } catch (error) {
            console.error(error);
            return;
        }

        redirect("/account/addresses");
    }

    return (
        <main className="p-6 max-w-xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/account/addresses" className="hover:text-gray-600">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold">Novo Endereço</h1>
            </div>

            <form action={handleAction}>
                <AddressFields />
                
                <button 
                    type="submit" 
                    className="mt-6 bg-black text-white w-full p-3 rounded-xl font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    Salvar Endereço
                </button>
            </form>
        </main>
    );
}