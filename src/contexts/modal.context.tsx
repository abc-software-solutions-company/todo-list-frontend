import {createContext} from 'react';

export interface ModalContextInterface {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
}

const ModalCtx = createContext<ModalContextInterface | null>(null);

export default ModalCtx;
