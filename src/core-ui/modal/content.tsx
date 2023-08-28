import React, {FC, ReactNode, useEffect} from 'react';

import {ICoreUIBaseProps} from '../types';
import {useModal} from './state';
import {setBodyClass} from './utils';

interface IModalContentProps extends ICoreUIBaseProps {
  children: ReactNode;
}

const Content: FC<IModalContentProps> = ({children}) => {
  const modal = useModal();

  useEffect(() => {
    modal.setCount(1);
    setBodyClass(true);
    return () => {
      modal.setCount(-1);
      if (modal.count <= 0) setBodyClass(false);
    };
  }, []);

  return <div className="abc-modal__content">{children}</div>;
};

Content.displayName = 'Modal.Content';

export default Content;
