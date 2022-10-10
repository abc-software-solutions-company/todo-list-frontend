import React, {FC, ReactNode} from 'react';

interface INoopProps {
  children: ReactNode;
}

const Noop: FC<INoopProps> = ({children}) => <>{children}</>;

export default Noop;
