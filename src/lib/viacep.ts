export async function getAddressByCep(cep: string) {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return null;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (data.erro) return null;

        return {
            street: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            state: data.uf,
        };
    } catch (error) {
        console.error("Erro ao buscar o CEP", error);
        return null;
    }
}