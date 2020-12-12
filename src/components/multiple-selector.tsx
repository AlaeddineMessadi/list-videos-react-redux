import React from 'react';
import Select from '@material-ui/core/Select';
import { Category } from '../common/interfaces';

interface MultipleSelectorProps {
  categories: Category[];
  label: string;
}

export const MultipleSelector: React.FC<MultipleSelectorProps> = ({ categories, label }) => {
  const [categoryName, setCategory] = React.useState<string[]>([]);

  const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];

    Object.entries(options).map((element, i) => {
      const option = element[1];
      if (option.selected) {
        value.push(option.value);
      }
    });

    setCategory(value);
  };

  const inputId: string = `select-multiple-${label.toLowerCase()}`;
  return (
    <>
      <Select
        multiple
        native
        value={categoryName}
        onChange={handleChangeMultiple}
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
