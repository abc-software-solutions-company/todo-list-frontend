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
import cls from 'classnames';

import {Color, XPosition} from '../types';

interface ISwitcherProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
  error?: ReactNode;
  name?: string;
  color?: Color;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Switcher: FC<ISwitcherProps> = forwardRef(
  ({className, name, color, disabled, error, checked = false, onChange}, ref: Ref<HTMLInputElement>) => {
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
      <div
        className={cls(
          'abc-switcher',
          className,
          color,
          disabled && 'disabled',
          error && 'error',
          value ? 'checked' : 'unchecked'
        )}
      >
        <label>
          <div className="layer1">
            <div className="layer2"></div>
            <input
              type="checkbox"
              className="hidden"
              name={name}
              checked={value}
              disabled={!!disabled}
              ref={ref}
              onChange={handleChange}
            />
          </div>
        </label>
      </div>
    );
  }
);

export default memo(Switcher);
