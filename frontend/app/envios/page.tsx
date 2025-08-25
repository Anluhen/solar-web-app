export const dynamic = 'force-dynamic';
import type { Envio } from '@/envios/types/envio';
import type { SearchParams } from '@/envios/types/SearchParams';
import EnvioRow from '@/envios/components/EnvioRow';
import SearchForm from '@/envios/components/SearchForm';
import Link from 'next/link';

async function getEnvios(params: SearchParams): Promise<Envio[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/envios`);
  Object.entries(params ?? {}).forEach(([k, v]) => {
    if (v !== undefined && v !== '') url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

export default async function EnviosPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  
  const envios = await getEnvios(sp);

  return (
    <div className="max-w-8/10 m-auto">
      <h1 className="pb-4 pt-4 text-2xl font-bold">Envios</h1>
      <Link
        href="/envios/new"
        className="mb-2 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
      >
        Adicionar Envio
      </Link>

      <SearchForm
        searchParams={sp}
      />

      <div className='rounded-xl max-h-[calc(100vh-var(--spacing)*43)] overflow-y-auto'>
        <table className="w-full border border-gray-200 shadow-md">
          <thead className="sticky top-0 text-sm uppercase bg-gray-200">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">PEP</th>
              <th className="p-2 text-left">ZVGP</th>
              <th className="p-2 text-left">Gerador</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {envios.map((e) => (
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