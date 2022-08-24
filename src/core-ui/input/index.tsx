import React, {FC, forwardRef, InputHTMLAttributes, Ref} from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  type?: 'text' | 'radio' | 'checkbox' | 'date' | 'file' | 'email';
  onClick?: () => void;
}

const Input: FC<IProps> = forwardRef(
  ({className, onClick, placeholder, type = 'text', ...rest}, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        className={['form-input', className?.toString()].join(' ')}
        onClick={onClick}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    );
  }
);
Input.displayName = 'Input';

export default Input;
