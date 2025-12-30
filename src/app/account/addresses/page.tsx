import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft, Plus } from "lucide-react";
import { DeleteAddressButton } from "@/components/address/deleteAddressButton";
import { handleBuildComplete } from "next/dist/build/adapter/build-complete";
// import { AddressList } from "./_components/address-list";

export default async function AddressesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold">Meus Endereços</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/account/addresses/new"
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-black hover:text-black transition-all gap-2"
        >
          <Plus size={32} />
          <span className="font-medium">Adicionar novo endereço</span>
        </Link>

        {addresses.map((address) => (
          <div key={address.id} className="border rounded-xl p-6 shadow-sm relative group bg-white">
            <div className="flex items-start justify-between">
              <div className="bg-gray-100 p-2 rounded-lg mb-4 text-gray-600">
                <MapPin size={20} />
              </div>
            </div>
            
            <h3 className="font-bold text-lg mb-1">{address.street}, {address.number}</h3>
            <p className="text-gray-500 text-sm">{address.district}</p>
            <p className="text-gray-500 text-sm">{address.city} - {address.state}</p>
            <p className="text-gray-400 text-xs mt-2">{address.zipCode}</p>

            <div className="mt-4 pt-4 border-t flex gap-4">
               <DeleteAddressButton id={address.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}