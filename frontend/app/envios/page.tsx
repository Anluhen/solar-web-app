export const dynamic = 'force-dynamic';
import type { Envio } from '@/envios/types/envio';
import EnvioRow from '@/envios/components/EnvioRow'
import Link from 'next/link';

async function getEnvios(): Promise<Envio[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/envios`;
  const res = await fetch(url, {
    // If API is on a different origin, cookies aren't needed:
    // credentials: 'include',
    // Ensure no caching during dev:
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

export default async function EnviosPage() {
  const envios = await getEnvios();

  // Convert timezone to avoid hydration error
  const fmt = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const rows = envios.map(e => ({
    ...e,
    created_at_fmt: fmt.format(new Date(e.created_at)),
    updated_at_fmt: fmt.format(new Date(e.updated_at)),
  }));

  return (
    <div className="max-w-8/10 m-auto">
      <h1 className="pb-4 pt-4 text-2xl font-bold">Envios</h1>
      <Link
        href="/envios/new"
        className="mb-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
      >
        Adicionar Envio
      </Link>
      <div className='rounded-xl max-h-[calc(100vh-var(--spacing)*16)] overflow-y-auto'>
        <table className="w-full border border-gray-200 shadow-md">
          <thead className="sticky top-0 text-sm uppercase bg-gray-200">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">PEP</th>
              <th className="p-2 text-left">ZVGP</th>
              <th className="p-2 text-left">Gerador</th>
              <th className="p-2 text-left">Status</th>
              {/* <th className="p-2 text-left border border-gray-400">Observações</th> */}
              {/* <th className="p-2 text-left border border-gray-400">Criado</th> */}
              {/* <th className="p-2 text-left border border-gray-400">Atualizado</th> */}
            </tr>
          </thead>
          <tbody className='text-sm'>
            {rows.map((e) => (
              <EnvioRow
                key={e.id}
                envio={e}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}