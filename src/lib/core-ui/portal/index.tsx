import {FC, ReactElement, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

interface IProps {
  children: ReactElement;
}

const Portal: FC<IProps> = ({children}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.querySelector('#react-modal-root') as HTMLDivElement) : null;
};

export default Portal;
