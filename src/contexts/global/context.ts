import {Dispatch, createContext, useContext} from 'react';

import {IAction} from './actions';
import initialState, {IState} from './state';

export const Context = createContext<IState>(initialState);
export const DispatchContext = createContext<Dispatch<IAction>>(() => null);

export const useStateGlobal = () => useContext(Context);
export const useDispatchGlobal = () => useContext(DispatchContext);
