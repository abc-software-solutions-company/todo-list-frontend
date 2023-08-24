import {useContext} from 'react';

import * as actions from './actions';
import {Context, DispatchContext} from './context';

function useModalState() {
  const context = useContext(Context);
  if (context === undefined) throw new Error('useModalState must be used within a ModalProvider');
  return context;
}

function useModalDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) throw new Error('useModalDispatch must be used within a ModalProvider');
  return context;
}

export function useModal() {
  const state = useModalState();
  const dispatch = useModalDispatch();
  const setActiveModal = (label?: string) => dispatch(actions.setActiveModal(label));
  const setCount = (amount: number) => dispatch(actions.setCount(amount));
  return {...state, dispatch, setActiveModal, setCount};
}
