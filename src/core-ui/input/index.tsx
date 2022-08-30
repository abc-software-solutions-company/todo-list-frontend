import cls from 'classnames';
import React, {ChangeEventHandler, FC, forwardRef, ReactNode, Ref} from 'react';

import {Size, Variant} from '../types';

type InputType =
  | 'text'
  | 'email'
  | 'url'
  | 'password'
  | 'number'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'search'
  | 'tel'
  | 'time'
  | 'week';

interface IInputProps {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: ReactNode;
  labelRequire?: string | boolean;
  error?: ReactNode;
  value?: string;
  readOnly?: boolean;
  variant?: Variant;
  size?: Size;
  type?: InputType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputText: FC<IInputProps> = forwardRef(
  ({className, variant, label, labelRequire, error, type, ...rest}, ref: Ref<any>) => {
    const inputProps: any = {...rest};
    const wrapProps: IInputProps = {};

    wrapProps.className = cls('abc-input', variant, error && 'error');
    inputProps.className = cls('form-input', className, type);

    const requireText = typeof labelRequire === 'boolean' ? '*' : labelRequire;

    return (
      <div {...wrapProps}>
        <label>
          {label && (
            <>
              <span className="label">{label}</span>
              {labelRequire && <span className="required">{requireText}</span>}
            </>
          )}
          <input ref={ref} {...inputProps} />
          {typeof error === 'string' && error && <p className="message invalid">{error}</p>}
        </label>
      </div>
    );
  }
);

InputText.displayName = 'AIInputText';

export default InputText;
