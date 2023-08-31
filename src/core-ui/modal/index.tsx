import classNames from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';
import React, {FC, ReactNode, useMemo} from 'react';

import Backdrop from '../backdrop';
import Close from '../close';
import Portal from '../portal';
import {ICoreUIBaseProps, ModalVariantType} from '../types';
import Body, {IModalBodyProps} from './body';
import Content from './content';
import Footer, {IModalFooterProps} from './footer';
import Header, {IModalHeaderProps} from './header';
import {getVariantClass} from './utils';

interface IModalComposition {
  Header: FC<IModalHeaderProps>;
  Body: FC<IModalBodyProps>;
  Footer: FC<IModalFooterProps>;
}

interface IModalProps extends ICoreUIBaseProps {
  children?: ReactNode;
  dataCy?: string;
  variant?: ModalVariantType;
  fullScreen?: boolean;
  backdrop?: boolean;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeByEscapeKey?: boolean;
  transitionTime?: number;
  open: boolean;
  onClose: () => void;
}

const Modal: FC<IModalProps> & IModalComposition = ({
  children,
  className = 'max-w-xl',
  variant = 'top',
  backdrop = true,
  showCloseButton = true,
  closeOnBackdrop = true,
  transitionTime = 150,
  open = false,
  onClose
}) => {
  const dialogVariantClass = useMemo(() => getVariantClass(variant), []);

  const handleClose = () => {
    onClose();
  };

  return (
    <Portal>
      <AnimatePresence>
        <Backdrop
          className={classNames('abc-modal scrollbar', dialogVariantClass)}
          visible={backdrop && open}
          onClick={() => {
            if (closeOnBackdrop) handleClose();
          }}
        >
          {open && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: transitionTime / 1000}}
              className={classNames('abc-modal__dialog', className)}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <Content>
                {children}
                <Close className="abc-modal__close" visible={showCloseButton} onClick={handleClose} />
              </Content>
            </motion.div>
          )}
        </Backdrop>
      </AnimatePresence>
    </Portal>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

Modal.displayName = 'ABCModal';

export default Modal;
