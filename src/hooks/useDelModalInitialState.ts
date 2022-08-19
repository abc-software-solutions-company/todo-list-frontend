import {ModalContextInterface} from '@/contexts/modal.context';
import {useState} from 'react';

const UseDelModalInitialState = () => {
  const [isOpen, setIsOpen] = useState(false);

  const delModalInitState: ModalContextInterface = {
    isOpen: isOpen,
    show: () => {
      setIsOpen(true);
    },
    hide: () => {
      setIsOpen(false);
    }
  };

  return delModalInitState;
};

export default UseDelModalInitialState;
