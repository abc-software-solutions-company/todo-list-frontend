import classNames from 'classnames';
import React, {FC, ReactNode} from 'react';

import Heading from '../heading';

interface IModalHeaderTextProps {
  className?: string;
  content: ReactNode;
}

export interface IModalHeaderProps {
  className?: string;
  text?: string | null;
  children?: ReactNode;
}

const HeaderText: FC<IModalHeaderTextProps> = ({className, content}) => {
  return (
    <Heading as="h3" className={classNames('abc-modal__title', className)}>
      {content}
    </Heading>
  );
};

const Header: FC<IModalHeaderProps> = ({className, text, children}) => {
  const childrenIsText = typeof children === 'string';
  const content = text ? <HeaderText content={text} /> : childrenIsText ? <HeaderText content={children} /> : children;
  return <div className={classNames('abc-modal__header', className)}>{content}</div>;
};

Header.displayName = 'Modal.Header';

export default Header;
