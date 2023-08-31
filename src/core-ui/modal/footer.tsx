import classNames from 'classnames';
import React, {FC, ReactNode} from 'react';

export interface IModalFooterProps {
  className?: string;
  children?: ReactNode;
}

const Footer: FC<IModalFooterProps> = ({className, children}) => {
  return <div className={classNames('abc-modal__footer', className)}>{children}</div>;
};

Footer.displayName = 'Modal.Footer';

export default Footer;
