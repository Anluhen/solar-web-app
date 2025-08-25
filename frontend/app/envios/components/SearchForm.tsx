'use client'

import { useState } from 'react';
import type { SearchParams } from '@/envios/types/SearchParams';

export default function SearchForm({ searchParams }: { searchParams: SearchParams }) {
  const [search, setSearch] = useState<SearchParams>(searchParams);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSearch(prev => ({ ...prev, [name]: value }));
  }

  return (
    <form method='GET' className="grid grid-cols-2 lg:grid-cols-4 gap-1 mb-2 m-auto">
      <div className="bg-white">
        <label className="sr-only">Buscar ID</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            id="id"
            name="id"
            value={search.id ?? ''}
            onChange={handleChange}
            className="ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50"
            placeholder="Buscar ID" />
        </div>
      </div>
      <div className="bg-white">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            id="pep"
            name="pep"
            value={search.pep ?? ''}
            onChange={handleChange}
            className="ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50"
            placeholder="Buscar PEP" />
        </div>
      </div>
      <div className="bg-white">
        <label className="sr-only">Buscar ZVGP</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            id="zvgp"
            name="zvgp"
            value={search.zvgp ?? ''}
            onChange={handleChange}
            className="ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50"
            placeholder="Buscar ZVGP" />
        </div>
      </div>
      <div className="bg-white">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            id="gerador"
            name="gerador"
            value={search.gerador ?? ''}
            onChange={handleChange}
            className="ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50"
            placeholder="Buscar Gerador" />
        </div>
      </div>
      <div className="col-span-2 lg:col-span-4 flex gap-2">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
        >Buscar</button>
        <a
          href="/envios"
          className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-100 inline-block"
        >Limpar</a>
      </div>
    </form>
  );
}