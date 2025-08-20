interface DeliveryItem {
    id: string;
    description: string;
    quantity: string;
}

interface ItemsTableProps {
    items: DeliveryItem[];
    setItems: React.Dispatch<React.SetStateAction<DeliveryItem[]>>;
    editable: boolean;
    handlePaste: (e: React.ClipboardEvent<HTMLTableElement>) => void;
}

export default function ItemsTable({
    items,
    setItems,
    editable,
    handlePaste,
}: ItemsTableProps) {
    return (
        <table
            className="table-auto max-w-400px bg-white rounded shadow"
            onPaste={handlePaste}
        >
            <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2 text-left">Item SAP</th>
                    <th className="px-4 py-2 text-left">Descrição</th>
                    <th className="px-4 py-2 text-center">Quantidade</th>
                    <th className="px-4 py-2 text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                        <td className="px-4 py-2">
                            <input
                                type="text"
                                className="input input-sm input-bordered w-full"
                                value={item.id}
                                disabled={!editable}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[index].id = e.target.value;
                                    setItems(newItems);
                                }}
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                                type="text"
                                className="input input-sm input-bordered w-full"
                                value={item.description}
                                disabled={!editable}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[index].description = e.target.value;
                                    setItems(newItems);
                                }}
                            />
                        </td>
                        <td className="px-4 py-2 text-center">
                            <input
                                type="number"
                                className="input input-sm input-bordered text-center"
                                value={item.quantity}
                                disabled={!editable}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[index].quantity = e.target.value;
                                    setItems(newItems);
                                }}
                            />
                        </td>
                        <td className="px-4 py-2 text-center">
                            <button
                                disabled={!editable}
                                onClick={() => {
                                    const newItems = items.filter((_, i) => i !== index);
                                    setItems(newItems);
                                }}
                                className="btn btn-sm btn-error"
                            >
                                ✕
                            </button>
                        </td>
                    </tr>
                ))}
                {editable && (
                    <tr>
                        <td colSpan={4} className="px-4 py-2 text-center">
                            <button
                                onClick={() =>
                                    setItems([...items, { id: '', description: '', quantity: '' }])
                                }
                                className="btn btn-sm btn-success"
                            >
                                + Adicionar Item
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}