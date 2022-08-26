import React, {FC, forwardRef, InputHTMLAttributes, Ref} from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onClick?: () => void;
}

const Checkbox: FC<IProps> = forwardRef(({className, ...rest}, onClick, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      className={['form-checkbox', className?.toString()].join(' ')}
      type="checkbox"
      ref={ref}
      {...rest}
      onClick={onClick}
    />
  );
});
Checkbox.displayName = 'Checkbox';

export default Checkbox;
