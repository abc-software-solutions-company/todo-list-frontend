import React, {FC, useState} from 'react';

import Portal from '../portal';

interface IProps {
  title?: string;
  open: boolean;
  anchor: 'top' | 'right' | 'bottom' | 'left';
  backdrop?: boolean;
  onClose: (value: boolean) => void;
}

const DrawerMenu: FC<IProps> = ({backdrop = false, open = false, anchor = 'left', title = '', onClose}) => {
  const [hide, setHide] = useState<boolean>(false);

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Portal>
      <div className="drawer-root">
        {backdrop && <div className={`abc-backdrop ${open ? 'show' : ''}`} onClick={handleClose}></div>}
        {!hide && (
          <div onAnimationEnd={() => setHide(true)} className={`drawer-menu ${anchor} ${open ? 'show' : ''}`}>
            <div className="drawer-header">
              <h5>{title}</h5>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="drawer-body">...</div>
          </div>
        )}
      </div>
    </Portal>
  );
};

export default DrawerMenu;
