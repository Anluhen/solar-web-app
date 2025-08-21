'use client'
import { useState } from 'react';

import type { Envio } from '@/envios/types/envio';

interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

function InputField({
  name,
  label,
  value,
  onChange,
  readOnly,
}: InputFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        className="border border-gray-200 rounded b"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}

// async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//   e.preventDefault();
//   const fd = new FormData(e.currentTarget);

//   // Build the payload from form values
//   const payload = {
//     id: fd.get('id'),                          // immutable, but send if your API wants it
//     pep: fd.get('pep') as string | null,
//     zvgp: fd.get('zvgp') as string | null,
//     gerador: fd.get('gerador') as string | null,
//     observacoes: fd.get('observacoes') as string | null,
//     status: fd.get('status') as string | null,
//   };

//   // Call your NestJS API
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/envios/${envio.id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     alert(`Falha ao salvar: ${text}`);
//     return;
//   }

//   // Lightweight success UX; you can also use router.refresh()
//   alert('Salvo com sucesso!');
// }

export default function EnvioForm({ envio }: { envio: Envio }) {
  const [form, setForm] = useState({
    id: String(envio.id ?? ''),
    pep: String(envio.pep ?? ''),
    zvgp: String(envio.zvgp ?? ''),
    gerador: String(envio.gerador ?? ''),
    observacoes: String(envio.observacoes ?? ''),
    status: String(envio.status ?? ''),
    created_at: String(envio.created_at ?? ''),
    updated_at: String(envio.updated_at ?? ''),
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }
  
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded shadow">
      <InputField
        name= "id"
        label="ID"
        value={form.id}
        readOnly
      />
      <InputField
        name="pep"
        label="PEP"
        value={form.pep}
        onChange={handleChange}
      />
      <InputField
        name="zvgp"
        label="ZVGP"
        value={form.zvgp}
        onChange={handleChange}
      />
      <InputField
        name="gerador"
        label="Gerador"
        value={form.gerador}
        onChange={handleChange}
      />
      <InputField
        name="status"
        label="Status"
        value={form.status}
        onChange={handleChange}
      />
      <InputField
        name="observacoes"
        label="Observações"
        value={form.observacoes}
        onChange={handleChange}
      />
      <InputField
        name="created_at"
        label="Criado em"
        value={form.created_at}
        onChange={handleChange}
      />
      <InputField
        name="updated_at"
        label="Atualizado em"
        value={form.updated_at}
        onChange={handleChange}
      />
    </form>
  );
}