import React from 'react';

type Delivery = {
  id: number;
  date: string;
  salesOrder: string;
  generator: string;
  projectId: string;
};

interface DeliveryRowProps {
  delivery: Delivery;
  onRowClick: () => void;
}

export default function DeliveryRow({ delivery, onRowClick }: DeliveryRowProps) {
  return (
    <tr
      onClick={onRowClick}
      className="cursor-pointer border-b border-gray-200 bg-white hover:bg-gray-100"
    >
      <td className="text-center px-4 py-2">{delivery.id}</td>
      <td className="text-center px-4 py-2">{delivery.date}</td>
      <td className="text-center px-4 py-2">{delivery.salesOrder}</td>
      <td className="text-center px-4 py-2">{delivery.generator}</td>
      <td className="text-center px-4 py-2">{delivery.projectId}</td>
    </tr>
  );
}
