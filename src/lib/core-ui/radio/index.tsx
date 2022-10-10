import cls from 'classnames';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  forwardRef,
  InputHTMLAttributes,
  memo,
  ReactNode,
  Ref,
  useEffect,
  useState
} from 'react';

import {Color, XPosition} from '../types';

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
  label?: ReactNode;
  labelPosition?: XPosition;
  error?: ReactNode;
  name?: string;
  color?: Color;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Radio: FC<IRadioProps> = forwardRef(
  (
    {className, name, color, label, labelPosition = 'end', disabled, error, checked = false, onChange},
    ref: Ref<HTMLInputElement>
  ) => {
    const [value, setValue] = useState<boolean>(checked);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      setValue(target.checked);
      onChange?.(event);
    };

    useEffect(() => {
      setValue(checked);
    }, [checked]);

    return (
      <div className={cls('abc-radio', color, disabled && 'disabled', error && 'error')}>
        <label>
          {label &&
            labelPosition === 'start' &&
            (typeof label === 'string' ? <span className="mr-2">{label}</span> : label)}
          <input
            type="radio"
            className={cls('form-radio', className)}
            name={name}
            checked={value}
            disabled={!!disabled}
            ref={ref}
            onChange={handleChange}
          />
          {label &&
            labelPosition === 'end' &&
            (typeof label === 'string' ? <span className="ml-2">{label}</span> : label)}
        </label>
      </div>
    );
  }
);

Radio.displayName = 'AIRadio';

export default memo(Radio);
