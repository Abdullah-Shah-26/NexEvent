interface FormInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export default function FormInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  minLength,
  maxLength,
}: FormInputProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
}
