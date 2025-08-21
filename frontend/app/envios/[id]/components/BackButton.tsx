'use client'

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.push('/envios')}
      className='btn btn-primary mb-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
    >
      Retornar
    </button>
  );
}