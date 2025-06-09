import React from 'react';

type ButtonType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'dark';

interface IconProps {
  size?: number;
}

interface CustomButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: number;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
  icon,
  size = 14,
  className = '',
  type = 'default',
  disabled = false,
}) => {
  const getTypeStyles = (): string => {
    switch (type) {
      case 'primary':
        return 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700';
      case 'success':
        return 'bg-green-600 text-white border-green-700 hover:bg-green-700';
      case 'danger':
        return 'bg-red-600 text-white border-red-700 hover:bg-red-700';
      case 'warning':
        return 'bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600';
      case 'dark':
        return 'bg-gray-800 text-white border-gray-900 hover:bg-gray-900';
      default:
        return 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100';
    }
  };

  const baseStyles = `
    flex items-center px-2 py-0.5 text-sm rounded border transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const typeStyles = getTypeStyles();
  const combinedClassName = `${baseStyles} ${typeStyles} ${className}`.trim();

  return (
    <button
      type="button"
      className={combinedClassName}
      onClick={onClick}
      style={{ fontSize: size }}
      disabled={disabled}
    >
      {icon && (
        <span className="mr-1 flex-shrink-0">
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<IconProps>, { size })
            : icon}
        </span>
      )}
      {children}
    </button>
  );
};

export default CustomButton;