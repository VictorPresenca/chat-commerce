"use client";

import { useState } from "react";
import { getAddressByCep } from "@/lib/viacep";

interface AddressFormProps {
  isEmbedded?: boolean;
  addressData?: any;
}

export function AddressFields({ isEmbedded = false, addressData }: AddressFormProps) {
  const [loadingCep, setLoadingCep] = useState(false);
  const [address, setAddress] = useState({
    street: addressData?.street || "",
    district: addressData?.district || "",
    city: addressData?.city || "",
    state: addressData?.state || "",
  });

  async function handleCepBlur(e: React.FocusEvent<HTMLInputElement>) {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      setLoadingCep(true);
      const data = await getAddressByCep(cep);
      if (data) setAddress(data);
      setLoadingCep(false);
    }
  }

  const fields = (
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
        <input name="number" placeholder="Nº" className="col-span-1 border p-2 rounded" required />
      </div>

      <div className="grid grid-cols-2 gap-2">
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
      </div>

      <div className="grid grid-cols-4 gap-2">
        <input name="complement" placeholder="Complemento (Opcional)" className="col-span-3 border p-2 rounded" />
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
    </div>
  );

  return isEmbedded ? fields : <div className="p-1">{fields}</div>;
}

{/* <div className="space-y-2">

    <div className="flex justify-between items-center">
        <label className="text-xs font-medium">Endereço de Entrega</label>
    </div>

    <div className="grid grid-cols-4 gap-2">
        <input 
            placeholder="Rua"
        />
        <input 
            name="number"
        />
    </div>

    <div className="grid grid-cols-3 gap-2">
        <input 
            placeholder="Bairro"
        />

        <input
            placeholder="Cidade"
        />
        <input 
            name="complement" 
        />
    </div>
    <input
        placeholder="UF"
    />
</div> */}