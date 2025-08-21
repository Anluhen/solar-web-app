export const dynamic = 'force-dynamic';

import type { Envio } from '@/envios/types/envio'

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
    <div className='max-w-8/10 m-auto'>
      `{envio.id} fetched`
    </div>
  );
}