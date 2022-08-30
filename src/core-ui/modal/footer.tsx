import React, {FC, ReactNode} from 'react';

export interface IModalFooterProps {
  children?: ReactNode;
}

const Footer: FC<IModalFooterProps> = ({children}) => {
  return <div className="modal-footer">{children}</div>;
};

export default Footer;
