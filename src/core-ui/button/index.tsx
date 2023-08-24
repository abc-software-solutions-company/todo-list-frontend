import cls from 'classnames';
import React, {FC, MouseEventHandler, ReactNode} from 'react';

import Loading from '../loading';
import {ButtonVariantType, ColorType, IconSizeType, XPosition} from '../types';

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
  color?: ColorType;
  size?: IconSizeType;
  loadingPosition?: XPosition;
  variant?: ButtonVariantType;
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
      {content && !loading && loadingPosition && <>{content}</>}
      {endIcon && <span className="icon">{endIcon}</span>}
      {loading && loadingPosition === 'end' && <Loading className="loading" />}
    </Tag>
  );
};

Button.displayName = 'AIButton';

export default Button;
