'use client'
import { useState } from 'react';
import type { Materiais, Material } from '@/envios/types/materiais';

export default function MateriaisTable({ materiais }: { materiais: Materiais }) {
  const [original, setOriginal] = useState<Materiais>(materiais);
  const [form, setForm] = useState<Materiais>(materiais);
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [deleting, setDeleting] = useState<Record<number, boolean>>({});

  function handleChange(
    id: number,
    field: keyof Material,
    value: string | number
  ) {
    setForm((prev) => prev.map((m) => m.id === id ? { ...m, [field]: value } : m));
  }

  function isRowDirty(id: number) {
    const a = form.find(m => m.id === id);
    const b = original.find(m => m.id === id);

    if (!a || !b) return false

    return a.sap !== b.sap || a.descricao !== b.descricao || a.quantidade !== b.quantidade;
  }

  async function saveRow(id:number) {
    const row = form.find(m => m.id === id);
    if (!row) return;

    try {
      setSaving(s => ({ ...s, [id]: true }));
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          sap: row.sap,
          descricao: row.descricao,
          quantidade: row.quantidade,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`PUT /materiais/${id}: ${res.status} ${res.text}`);
      }
      const updated: Material = await res.json();
    
      setOriginal(prev => prev.map(m => (m.id === id ? updated : m)));
      setForm(prev => prev.map(m => (m.id === id ? updated : m)));
    } catch (err) {
      console.log(err);
      alert('Falha ao salvar material.');
    } finally {
      setSaving(s => ({ ...s, [id]: false }));
    }
  }

  async function deleteRow(id: number) {
    if (!confirm('Excluir este material?')) return;
    try {
      setDeleting(d => ({ ...d, [id]: true }));
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/materiais/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`DELETE /materiais/${id}: ${res.status} ${text}`);
      }
      setOriginal(prev => prev.filter(m => m.id !== id));
      setForm(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
      alert('Falha ao excluir. Veja o console para detalhes.');
    } finally {
      setDeleting(d => ({ ...d, [id]: false }));
    }
  }

  return (
    <table className="table-auto max-w-400px bg-white rounded shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">Item SAP</th>
          <th className="px-4 py-2 text-left">Descrição</th>
          <th className="px-4 py-2 text-center">Quantidade</th>
          <th className="px-4 py-2 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {form.map(material => {
          const dirty = isRowDirty(material.id);

          return (
            <tr key={material.id} className="border-b border-gray-200">
              <td className="px-4 py-2">
                <input
                  type="text"
                  className="input input-sm input-bordered w-full"
                  value={material.sap}
                  onChange={(e) =>
                    handleChange(material.id, 'sap', e.target.value)
                  }
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  className="input input-sm input-bordered w-full"
                  value={material.descricao}
                  onChange={(e) =>
                    handleChange(material.id, 'descricao', e.target.value)
                  }
                />
              </td>
              <td className="px-4 py-2 text-center">
                <input
                  type="number"
                  className="input input-sm input-bordered text-center"
                  value={material.quantidade}
                  onChange={(e) =>
                    handleChange(material.id, 'quantidade', e.target.value)
                  }
                />
              </td>
              <td className="px-4 py-2 text-center">
                {dirty && (
                  <button
                    className="p-1 cursor-pointer font-extrabold text-green-600 hover:text-white hover:bg-green-600 hover:rounded"
                    disabled={!!saving[material.id]}
                    onClick={() => saveRow(material.id)}
                  >
                    {saving[material.id] ? 'Salvando…' : '✓'}
                  </button>
                )}
                <button
                  className="p-1 cursor-pointer font-extrabold text-red-600 hover:text-white hover:bg-red-600 hover:rounded"
                  disabled={!!deleting[material.id]}
                  onClick={() => deleteRow(material.id)}
                >
                  {deleting[material.id] ? 'Excluindo…' : '✕'}
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}