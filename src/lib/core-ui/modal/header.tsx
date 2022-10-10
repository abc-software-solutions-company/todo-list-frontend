import React, {FC, ReactNode} from 'react';

import IconButton from '../icon-button';
import {useModal} from './modal';

export interface IModalHeaderProps {
  text?: string;
  children?: ReactNode;
}

const Header: FC<IModalHeaderProps> = ({text, children}) => {
  const {onClose} = useModal();

  const content = text ? <h3>{text}</h3> : children;

  return (
    <div className="abc-modal-header">
      <IconButton className="abc-modal-close" name="ico-x-circle" size={28} onClick={() => onClose(false)} />
      {content}
    </div>
  );
};

export default Header;
