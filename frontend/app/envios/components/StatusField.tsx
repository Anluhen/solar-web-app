interface StatusFieldProps {
  step: number;
  status: string[];
  onPrev: () => void;
  onNext: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  editable: boolean;
}

export default function StatusField({
  step,
  status,
  onPrev,
  onNext,
  message,
  setMessage,
  editable,
}: StatusFieldProps) {
  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded shadow">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1 text-gray-700">
          Status ({step})
        </label>
        <input
          type="text"
          className="input input-bordered w-64"
          value={status[step]}
          disabled
        />
        <textarea
          className={`textarea textarea-bordered w-64 mt-2 ${message === '' ? 'hidden' : ''}`}
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={!editable}
        />
      </div>
      <div className="space-x-2">
        <button
          onClick={onPrev}
          className="btn btn-primary mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={step === 0}
        >
          ◀ Devolver
        </button>
        <button
          onClick={onNext}
          className="btn btn-primary mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={step === status.length - 1 || editable}
        >
          Enviar ▶
        </button>
      </div>
    </div>
  );
}