import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  format: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  format,
  onChange,
}) => {
  return (
    <div className="flex flex-col items-start">
      <label className="text-lg font-semibold mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 w-64"
      />
    </div>
  );
};

export default InputField;
