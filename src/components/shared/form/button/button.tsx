import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 rounded cursor-pointer flex items-center justify-center ${
        disabled ? "opacity-20 cursor-not-allowed !bg-gray" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
