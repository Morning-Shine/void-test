import React, { type InputHTMLAttributes } from 'react';

interface DigitInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number;
  min?: number;
  max?: number;
}

export const DigitInputComponent: React.FC<DigitInputProps> = (props) => {
  const { value, min = 1, max = 10, onChange } = props;
  return (
    <input
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      style={{ width: 80, padding: '8px 12px' }}
    />
  );
};
DigitInputComponent.displayName = 'DigitInput';

export const DigitInput = React.memo(DigitInputComponent);
