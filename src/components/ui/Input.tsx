import React from 'react';
import { ReactElement } from 'react';

type Props = {
  value: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  label: string;
  placeholder?: string;
  isValid?: boolean;
  disabled?: boolean;
  autocomplete?: string;
};

const Input = ({
  value,
  type = 'text',
  onChange,
  onKeyPress,
  label,
  placeholder,
  isValid,
  disabled,
  autocomplete = 'off',
}: Props): ReactElement => {
  const getContextualMarkup = () =>
    isValid ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100';

  return (
    <input
      value={value}
      id={label}
      className={`border-2 custom-rounded-sm w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline ${getContextualMarkup()}`}
      type={type}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autocomplete}
    />
  );
};

export default Input;
