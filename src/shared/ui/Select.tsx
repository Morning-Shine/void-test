import React from 'react';
import type { SelectOption } from '../model/types';

type SelectProps<T extends string | number> = {
  options: SelectOption<T>[];
  withPlaceholder?: string;
  selectedOption: T;
  onChange: (e: T) => void;
};

const SelectComponent  = <T extends string | number>(props: SelectProps<T>) => {
  const { options, withPlaceholder, selectedOption, onChange } = props;

  return (
    <select
      value={selectedOption}
      onChange={(e) => {
        const rawValue = e.target.value;
        const processedValue =
          typeof selectedOption === 'number' ? Number(rawValue) : rawValue;
        onChange(processedValue as T);
      }}
    >
      {withPlaceholder && (
        <option
          value=""
          disabled
        >
          {withPlaceholder}
        </option>
      )}
      {options.map((o) => (
        <option
          key={o.id}
          value={o.id}
        >
          {o.value}
        </option>
      ))}
    </select>
  );
};

export const Select = React.memo(SelectComponent) as typeof SelectComponent;
