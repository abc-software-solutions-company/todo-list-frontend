import classNames from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';
import React, {FC, ReactNode} from 'react';

import {IBaseProps} from '@/types';

interface IBackdropProps extends IBaseProps {
  children?: ReactNode;
  onClick?: () => void;
}

const Backdrop: FC<IBackdropProps> = ({className, children, visible = false, onClick}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 300 / 1000}}
          className={classNames('abc-backdrop', visible && 'show', className)}
          onClick={onClick}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Backdrop.displayName = 'ABCBackdrop';

export default Backdrop;
