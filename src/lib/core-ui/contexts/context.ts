import {createContext, useContext} from 'react';

import initialState, {IState} from './state';

export const Context = createContext<IState>(initialState);

export const useStateCoreUI = () => useContext(Context);
