import React, {FC, ReactNode} from 'react';

import {Context} from './context';
import {IState} from './state';

interface IProps {
  theme: IState;
  children: ReactNode;
}

const Provider: FC<IProps> = ({theme, children}) => {
  return <Context.Provider value={theme}>{children}</Context.Provider>;
};

export default Provider;
