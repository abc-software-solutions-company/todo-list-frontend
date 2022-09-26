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
  onClick,
  disabled = false,
  loading = false,
  loadingPosition = 'start',
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
      {loading && loadingPosition === 'start' && <Loading className="loading" />}
      {startIcon && <span className="icon">{startIcon}</span>}
      {content && !loading && loadingPosition && (
        <p className={cls(startIcon && 'ml-2', endIcon && 'mr-2')}>{content}</p>
      )}
      {endIcon && <span className="icon">{endIcon}</span>}
      {loading && loadingPosition === 'end' && <Loading className="loading" />}
    </Tag>
  );
};

Button.displayName = 'AIButton';

export default Button;
