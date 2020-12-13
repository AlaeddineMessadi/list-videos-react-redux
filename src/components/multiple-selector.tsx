import React from 'react';
import Select from '@material-ui/core/Select';
import { Category } from '../common/interfaces';

interface MultipleSelectorProps {
  categories: Category[];
  value: number[];
  label: string;
  changeHandler?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  error?: boolean;
}

export const MultipleSelector: React.FC<MultipleSelectorProps> = ({ categories, label, value, changeHandler, error }) => {
  const inputId: string = `select-multiple-${label.toLowerCase()}`;

  return (
    <>
      <Select
        error={error}
        multiple
        native
        value={value}
        onChange={changeHandler}
        inputProps={{
          id: inputId,
        }}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </>
  );
};
