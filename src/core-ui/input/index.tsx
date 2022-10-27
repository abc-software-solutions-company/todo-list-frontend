import cls from 'classnames';
import React, {ChangeEvent, ChangeEventHandler, ComponentPropsWithRef, FC, forwardRef, ReactElement, ReactNode, useEffect, useState} from 'react';

import {Variant} from '../types';

type InputType = 'text' | 'email' | 'url' | 'password' | 'number' | 'date' | 'datetime-local' | 'month' | 'search' | 'tel' | 'time' | 'week';

interface IInputProps extends ComponentPropsWithRef<'input'> {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: ReactNode;
  labelRequire?: string | boolean;
  error?: ReactNode;
  value?: string;
  readOnly?: boolean;
  groupStart?: ReactElement;
  groupEnd?: ReactElement;
  variant?: Variant;
  type?: InputType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<IInputProps> = forwardRef(
  ({className, variant, label, labelRequire, error, type, value = '', groupStart, groupEnd, onChange, ...rest}, ref) => {
    const [val, setVal] = useState(value);

    const rootProps: IInputProps = {};
    rootProps.className = cls('abc-input', variant, error && 'error');

    const inputProps: IInputProps = {...rest};
    inputProps.className = cls('form-input', className, type);

    const inputGroupProps: IInputProps = {};
    inputGroupProps.className = 'input-group';

    const requireText = typeof labelRequire === 'boolean' ? '*' : labelRequire;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      setVal(target.value);
      onChange?.(event);
    };

    useEffect(() => {
      setVal(value);
    }, [value]);

    return (
      <div {...rootProps}>
        {label && (
          <>
            <span className="label">{label}</span>
            {labelRequire && <span className="required">{requireText}</span>}
          </>
        )}
        <div {...inputGroupProps}>
          {groupStart && <>{groupStart}</>}
          <input value={val} onChange={handleChange} {...inputProps} ref={ref} />
          {groupEnd && <>{groupEnd}</>}
        </div>
        {typeof error === 'string' && error && <p className="message invalid">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'AIInput';

export default Input;
