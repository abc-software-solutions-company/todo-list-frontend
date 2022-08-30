import cls from 'classnames';
import React, {FC, MouseEventHandler, ReactNode} from 'react';

import Loading from '../loading';
import {Color, Size, Variant, XPosition} from '../types';

interface IButtonProps {
  className?: string;
  href?: string;
  text?: string;
  loading?: boolean;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  color?: Color;
  size?: Size;
  loadingPosition?: XPosition;
  variant?: Variant;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const Button: FC<IButtonProps> = ({
  className,
  children,
  text,
  href,
  startIcon,
  endIcon,
  color,
  size,
  type = 'button',
  variant,
  loadingPosition,
  onClick,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const props: IButtonProps = {};

  const Tag = href ? 'a' : 'button';
  const content = text || children;

  if (Tag === 'button') {
    props.disabled = disabled;
    props.type = type;
  }

  props.onClick = onClick;
  props.className = cls(
    'abc-btn',
    className,
    variant,
    size,
    color,
    loading && 'loading',
    disabled && Tag === 'a' && 'disabled'
  );

  return (
    <Tag {...props} {...rest}>
      {loading && loadingPosition === 'start' && <Loading className="loading mr-2" />}
      {startIcon && <span className="icon mr-2">{startIcon}</span>}
      <span>{content}</span>
      {endIcon && <span className="icon ml-2">{endIcon}</span>}
      {loading && loadingPosition === 'end' && <Loading className="loading ml-2" />}
    </Tag>
  );
};

Button.displayName = 'AIButton';

export default Button;
