import React from 'react';
import type { ServiceItem } from '@/shared/model/types';
import { Button } from '@/shared/ui/Button';
import styles from './ServiceTable.module.css';

interface ServiceTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  selectedServices: ServiceItem[];
  onRemoveService: (item: ServiceItem) => void;
}

export const ServiceTable: React.FC<ServiceTableProps> = ({
  selectedServices,
  onRemoveService,
}) => {
  let totalPrice = 0;
  for (const item of selectedServices) {
    totalPrice += item.service.price * item.quantity;
  }

  return (
    <table className="services-table">
      <thead>
        <tr>
          <th>Услуга</th>
          <th>Цена за ед.</th>
          <th>Кол-во</th>
          <th>Сумма</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {selectedServices.map((item) => (
          <tr key={item.service.id}>
            <td>{item.service.name}</td>
            <td>{item.service.price.toLocaleString()} ₽</td>
            <td>{item.quantity}</td>
            <td>{(item.service.price * item.quantity).toLocaleString()} ₽</td>
            <td>
              <Button
                name="Удалить"
                onClick={() => onRemoveService(item)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>
            <strong>Итого:</strong>
          </td>
          <td colSpan={2}>
            <strong>{totalPrice.toLocaleString()} ₽</strong>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
