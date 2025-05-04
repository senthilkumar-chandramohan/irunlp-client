import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'danger';
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  variant = 'primary',
  children 
}) => {
  const baseClasses = "text-sm px-2 py-1 rounded hover:opacity-90 transition-opacity";
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    danger: "bg-red-200 text-red-800 hover:bg-red-300"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;