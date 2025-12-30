import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Package, MapPin, User, LogOut } from "lucide-react"; // Ícones opcionais

export default async function AccountHub() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const menuItems = [
    {
      title: "Meus Pedidos",
      description: "Veja o status das suas compras e histórico",
      icon: <Package size={24} />,
      href: "/account/orders",
    },
    {
      title: "Meus Endereços",
      description: "Gerencie seus locais de entrega",
      icon: <MapPin size={24} />,
      href: "/account/addresses",
    },
    {
      title: "Dados Pessoais",
      description: "Edite seu nome, e-mail e senha",
      icon: <User size={24} />,
      href: "/account/profile",
    },
  ];

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Olá, {session.user.name?.split(" ")[0]}!</h1>
        <p className="text-gray-500">Bem-vindo ao seu painel de controle.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group p-6 border rounded-xl hover:border-black transition-all bg-white shadow-sm hover:shadow-md"
          >
            <div className="mb-4 text-gray-400 group-hover:text-black transition-colors">
              {item.icon}
            </div>
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t">
        <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium">
          <LogOut size={20} /> Sair da conta
        </button>
      </div>
    </main>
  );
}