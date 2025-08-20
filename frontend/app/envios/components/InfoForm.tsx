import InputField from './InputField'

interface DeliveryItem {
    id: string;
    description: string;
    quantity: string;
  }

  interface DeliveryData {
    id: string;
    date: string;
    salesOrder: string;
    generator: string;
    projectId: string;
    status: number;
    messages: string[];
    items: DeliveryItem[];
  }

interface InfoFormProps {
  deliveryData: DeliveryData | null
  setDeliveryData: React.Dispatch<React.SetStateAction<DeliveryData | null>>
  editable: boolean
}

export default function InfoForm({
  deliveryData,
  setDeliveryData,
  editable,
}: InfoFormProps) {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6 bg-white p-4 rounded shadow">
            <InputField
                label="Data de Separação"
                value={deliveryData?.date ?? ''}
                editable={editable}
                onChange={(val) => setDeliveryData(deliveryData ? { ...deliveryData, date: val } : null)}
            />
            <InputField
                label="ZVGP"
                value={deliveryData?.salesOrder ?? ''}
                editable={editable}
                onChange={(val) => setDeliveryData(deliveryData ? { ...deliveryData, salesOrder: val } : null)}
            />
            <InputField
                label="Gerador"
                value={deliveryData?.generator ?? ''}
                editable={editable}
                onChange={(val) => setDeliveryData(deliveryData ? { ...deliveryData, generator: val } : null)}
            />
            <InputField
                label="PEP"
                value={deliveryData?.projectId ?? ''}
                editable={editable}
                onChange={(val) => setDeliveryData(deliveryData ? { ...deliveryData, projectId: val } : null)}
            />
        </div>
    )
}