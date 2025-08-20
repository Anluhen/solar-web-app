interface InputFieldProps {
  label: string;
  value: string;
  editable: boolean;
  onChange?: (value: string) => void;
}

export default function InputField({
  label,
  value,
  editable,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>
      <input
        type="text"
        className="border border-gray-200 rounded b"
        value={value}
        disabled={!editable}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}