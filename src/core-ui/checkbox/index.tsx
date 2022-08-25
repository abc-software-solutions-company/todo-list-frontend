import React, {FC, forwardRef, InputHTMLAttributes, Ref} from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Checkbox: FC<IProps> = forwardRef(({className, ...rest}, ref: Ref<HTMLInputElement>) => {
  return <input className={['form-checkbox', className?.toString()].join(' ')} type="checkbox" ref={ref} {...rest} />;
});
Checkbox.displayName = 'Checkbox';

export default Checkbox;
