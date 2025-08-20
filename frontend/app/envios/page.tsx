export const dynamic = 'force-dynamic';

type Envio = {
  id: number;
  pep: string;
  zvgp: string;
  gerador: string;
  status: 'RASCUNHO' | 'ENVIADO' | 'CANCELADO';
  observacoes: string | null;
  created_at: string;
  updated_at: string;
};

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
  
  return (
    <div className="max-w-8/10 p-8">
      <h1 className="pb-4 text-2xl font-bold">Envios</h1>
      <table className="w'-full border border-gray-200 shadow-md">
        <thead className="bg-gray-200 uppercase">
          <tr>
            <th className="p-2 text-left border">ID</th>
            <th className="p-2 text-left border">PEP</th>
            <th className="p-2 text-left border">ZVGP</th>
            <th className="p-2 text-left border">Gerador</th>
            <th className="p-2 text-left border">Status</th>
            <th className="p-2 text-left border">Observações</th>
            <th className="p-2 text-left border">Criado</th>
            <th className="p-2 text-left border">Atualizado</th>
          </tr>
        </thead>
        <tbody>
          {envios.map((e) => (
            <tr
              key={e.id}
              className="odd:bg-white even:bg-gray-50"
            >
              <td className="p-2 border">{e.id}</td>
              <td className="p-2 border">{e.pep}</td>
              <td className="p-2 border">{e.zvgp}</td>
              <td className="p-2 border">{e.gerador}</td>
              <td className="p-2 border">{e.status}</td>
              <td className="p-2 border">{e.observacoes ?? '-'}</td>
              <td className="p-2 border">{new Date(e.created_at).toLocaleString()}</td>
              <td className="p-2 border">{new Date(e.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}