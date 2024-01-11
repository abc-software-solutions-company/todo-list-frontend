import React, {FC} from 'react';

interface IButtonProps {
  className?: string;
  title: string;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = ({className, disabled, title}) => {
  return (
    <button
      className={`${className} ${
        disabled ? 'disabled bg-gray-200' : ''
      } flex h-14 items-center justify-center rounded-lg px-3 py-4`}
    >
      <span className="text-lg font-semibold">{title}</span>
    </button>
  );
};

export default Button;
