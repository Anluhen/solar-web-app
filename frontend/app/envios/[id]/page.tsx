export const dynamic = 'force-dynamic';

import type { Envio } from '@/envios/types/envio'

import Link from 'next/link';
import EnvioForm from './components/EnvioForm';

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

export default async function EnvioPage({ params }: { params: { id: string } }) {
  const envio = await getEnvio(params.id);

  return (
    <div className='p-4 w-screen m-auto'>
      <div className='p-4'>
      <Link
        href="/envios"
        className="btn btn-primary mb-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
      >
        Retornar
        </Link>
      </div>
      <div className='p-4'>
        <EnvioForm
          key={envio.id}
          envio={envio}
        />
      </div>
    </div>
  );
}