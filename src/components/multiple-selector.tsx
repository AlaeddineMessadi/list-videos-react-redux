import React from 'react';
import Select from '@material-ui/core/Select';
import { Category } from '../common/interfaces';

interface MultipleSelectorProps {
  categories: Category[];
  value: string[];
  label: string;
  changeHandler?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

export const MultipleSelector: React.FC<MultipleSelectorProps> = ({ categories, label, value, changeHandler }) => {
  const inputId: string = `select-multiple-${label.toLowerCase()}`;
  return (
    <>
      <Select
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
