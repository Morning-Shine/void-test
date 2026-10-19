import { useCallback, useMemo, useState } from 'react';
import type { SelectOption, ServiceItem } from '@/shared/model/types';
import { DigitInput } from '@/shared/ui/DigitInput';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { availableServices } from '@/shared/constants/services';
import { ServiceTable } from './ServiceTable';

export const ProjectBuilder = () => {
  const [optionValue, setOptionValue] = useState<string | number>('');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [quantity, setQuantity] = useState(1);

  const selectOptions = useMemo<SelectOption<number>[]>(
    () =>
      availableServices.map((i) => {
        return {
          id: i.id,
          value: `${i.name} — ${i.price.toLocaleString()} ₽`,
        };
      }),
    [availableServices],
  );

  const addService = useCallback(() => {
    const service = availableServices.find((s) => s.id === +optionValue);
    if (!service) return;

    setSelectedServices((prev) => {
      const existing = selectedServices.some(
        (item) => item.service.id === service.id,
      );

      if (existing) {
        return prev.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { service, quantity }];
    });
  }, [availableServices, optionValue, selectedServices, quantity]);


  const removeService = useCallback((item: ServiceItem) => {
    setSelectedServices((prev) => {
      return prev.filter((elem) => elem.service.id !== item.service.id);
    });
  }, []);

  return (
    <div
      className="project-builder"
      style={{ maxWidth: 700, margin: '0 auto', fontFamily: 'sans-serif' }}
    >
      <h2>Состав проекта</h2>

      <div
        className="add-service"
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 24,
          alignItems: 'center',
        }}
      >
        <Select
          options={selectOptions}
          selectedOption={optionValue}
          withPlaceholder="Выберите услугу"
          onChange={setOptionValue}
        />

        <DigitInput
          value={quantity}
          onChange={(e) => {
            const processedQuantity = Number(e.target.value);
            console.log('processedQuantity', processedQuantity);

            setQuantity(processedQuantity);
          }}
        />

        <Button
          name="Добавить"
          onClick={addService}
          disabled={optionValue === ''}
        />
      </div>

      {selectedServices.length > 0 ? (
        <ServiceTable
          selectedServices={selectedServices}
          onRemoveService={removeService}
        />
      ) : (
        <p style={{ color: '#888', fontStyle: 'italic' }}>
          Пока не добавлено ни одной услуги
        </p>
      )}
    </div>
  );
};
