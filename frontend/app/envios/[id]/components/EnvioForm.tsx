'use client'
import { useState } from 'react';
import type { Envio } from '@/envios/types/envio';

interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
}

function InputField({
  name,
  label,
  value,
  onChange,
  readOnly,
  className = '',
}: InputFieldProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        className="border border-gray-200 rounded p-1"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Build the payload from form values
    const payload:any = {
      id: fd.get('id'),                          // immutable, but send if your API wants it
      pep: fd.get('pep') || undefined,
      zvgp: fd.get('zvgp') || undefined,
      gerador: fd.get('gerador') || undefined,
      observacoes: fd.get('observacoes') ?? undefined,
      status: fd.get('status') || undefined,
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/envios/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      alert(`Falha ao salvar: ${text}`);
      return;
    }

    const updated = await res.json();

    setForm((f) => ({
      ...f,
      ...updated,
    }));

    // alert('Salvo com sucesso!');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }
  
  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-6 bg-white p-4 rounded shadow">
      <InputField
        name= "id"
        label="ID"
        value={form.id}
        readOnly
        className='sm:col-span-2'
      />
      <InputField
        name="pep"
        label="PEP"
        value={form.pep}
        onChange={handleChange}
        className='sm:col-span-3'
      />
      <InputField
        name="zvgp"
        label="ZVGP"
        value={form.zvgp}
        onChange={handleChange}
        className='sm:col-span-2'
      />
      <InputField
        name="gerador"
        label="Gerador"
        value={form.gerador}
        onChange={handleChange}
        className='sm:col-span-2'
      />
      <InputField
        name="status"
        label="Status"
        value={form.status}
        onChange={handleChange}
        className='sm:col-span-3'
      />
      <InputField
        name="created_at"
        label="Criado em"
        value={form.created_at}
        onChange={handleChange}
        readOnly
        className='sm:col-span-4'
      />
      <InputField
        name="updated_at"
        label="Atualizado em"
        value={form.updated_at}
        onChange={handleChange}
        readOnly
        className='sm:col-span-4'
      />
      <div className="flex flex-col sm:col-span-12">
        <label className="text-sm font-medium mb-1 text-gray-700">
          Observações
        </label>
        <textarea
          id="observacoes"
          name="observacoes"
          className="border border-gray-200 rounded p-1"
          value={form.observacoes}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-full">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}