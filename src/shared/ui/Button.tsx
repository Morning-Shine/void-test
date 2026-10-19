import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = (props) => {
  const { name, onClick, disabled } = props;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

ButtonComponent.displayName = 'Button';

export const Button = React.memo(ButtonComponent);
