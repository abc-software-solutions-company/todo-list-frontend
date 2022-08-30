import React, {FC, memo, ReactNode} from 'react';
import cls from 'classnames';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IProps {
  className?: string;
  text?: string;
  children?: ReactNode;
  as: HeadingTag;
}

const Heading: FC<IProps> = ({className, text, children, as = 'h1'}) => {
  const Element = as;
  const content = text || children;
  return <Element className={cls('abc-heading', className)}>{content}</Element>;
};

export default memo(Heading);
