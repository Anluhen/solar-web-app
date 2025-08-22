export const dynamic = 'force-dynamic';

import type { Envio } from '@/envios/types/envio';
import type { Materiais } from '@/envios/types/materiais';

import Link from 'next/link';
import EnvioForm from './components/EnvioForm';
import MateriaisTable from './components/MateriaisTable';

async function getEnvio(id: string): Promise<Envio> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/envios/${id}`;
  console.log(url);
  const res = await fetch(url, {
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

async function getMateriais(id: string): Promise<Materiais> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/envios/${id}/materiais`;
  console.log(url);
  const res = await fetch(url, {
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

export default async function EnvioPage({ params }: { params: { id: string } }) {
  const envio = await getEnvio(params.id);
  const materiais = await getMateriais(params.id);

  return (
    <div className='p-4 w-screen m-auto'>
      <div className='pl-4'>
        <Link
          href="/envios"
          className="mb-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
        >
          Retornar
        </Link>
      </div>
      <h1 className="p-4 text-2xl font-bold">Envio - {envio.id} - {envio.pep}</h1>
      <div className='p-4'>
        <EnvioForm
          key={envio.id}
          envio={envio}
        />
      </div>
      <h1 className="p-4 text-2xl font-bold">Materiais</h1>
      <div className='p-4'>
        <MateriaisTable
          key={envio.id}
          materiais={materiais}
        />
      </div>
    </div>
  );
}