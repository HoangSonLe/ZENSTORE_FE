import React from 'react';
import './SearchFixStyles.css';

interface CustomSearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  value,
  onChange,
  className = '',
  id = 'searchInput',
  ariaLabel = 'Search Input'
}) => {
  return (
    <input
      type="text"
      className={className}
      placeholder="Tìm sản phẩm"
      value={value}
      onChange={onChange}
      id={id}
      aria-label={ariaLabel}
    />
  );
};

export default CustomSearchInput;
