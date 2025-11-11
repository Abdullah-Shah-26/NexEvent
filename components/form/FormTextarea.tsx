interface FormTextareaProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  minLength?: number;
  rows?: number;
}

export default function FormTextarea({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  minLength,
  rows = 4,
}: FormTextareaProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        rows={rows}
      />
    </div>
  );
}
