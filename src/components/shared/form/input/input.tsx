import React from "react";

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  ...props
}) => {
  const inputClassNames = `w-full ${className} border border-modalBorder rounded-[8px] p-4 outline-none`;

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm font-[400] text-[16px]">
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${inputClassNames} h-[100px] resize-none`}
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${inputClassNames} h-[32px]`}
        />
      )}
    </div>
  );
};

export default Input;
