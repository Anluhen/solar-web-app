'use client';

import { useRouter } from 'next/navigation'; 
import type { Envio } from '@/envios/types/envio';

export default function EnvioRow({ envio }: { envio: Envio }) {
  const router = useRouter();

  return (
    <tr
      key={envio.id}
      onClick={() => router.push(`/envios/${envio.id}`)}
      className="text-sm odd:bg-white even:bg-gray-100 hover:bg-gray-200"
    >
      <td className="p-2 border border-gray-200">{envio.id}</td>
      <td className="p-2 border border-gray-200">{envio.pep}</td>
      <td className="p-2 border border-gray-200">{envio.zvgp}</td>
      <td className="p-2 border border-gray-200">{envio.gerador}</td>
      <td className="p-2 border border-gray-200">{envio.status}</td>
      {/* <td className="p-2 border border-gray-200">{envio.observacoes ?? '-'}</td> */}
      {/* <td className="p-2 border border-gray-200">{envio.created_at}</td> */}
      {/* <td className="p-2 border border-gray-200">{envio.updated_at}</td> */}
    </tr>
  );
} 