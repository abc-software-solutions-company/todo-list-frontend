import React, {createContext, FC, ReactNode, useContext, useMemo} from 'react';

import Body, {IModalBodyProps} from './body';
import Footer, {IModalFooterProps} from './footer';
import Header, {IModalHeaderProps} from './header';

interface IModalComposition {
  Header: FC<IModalHeaderProps>;
  Body: FC<IModalBodyProps>;
  Footer: FC<IModalFooterProps>;
}

interface IModalContext {
  open: boolean;
  onClose: () => void;
}

interface IModalProps {
  children?: ReactNode;
  open: boolean;
  backdrop?: boolean;
  onClose?: () => void;
}

const noop = () => {};

const ModalContext = createContext<IModalContext | undefined>(undefined);

export const Modal: FC<IModalProps> & IModalComposition = ({children, backdrop = true, open, onClose}) => {
  const memoizedContextValue = useMemo(() => ({open, onClose: onClose || noop}), [open, onClose]);

  if (!open) return null;

  return (
    <ModalContext.Provider value={memoizedContextValue}>
      <div className={`abc-modal ${open ? 'show' : ''}`}>
        {backdrop && <div className={`abc-backdrop ${open ? 'show' : ''}`} onClick={onClose}></div>}
        <div className="modal-dialog">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </ModalContext.Provider>
  );
};

export const useModal = (): IModalContext => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('This component must be used within a <Modal> component.');
  return context;
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

Modal.displayName = 'AIModal';
